// Stripe Webhook Handler
// Processes successful payments and updates donor records

module.exports = async (req, res) => {
    // Get configuration from app locals (set by server.js)
    const config = req.app.locals.config || {};

    // Initialize Stripe with configuration
    const stripe = require('stripe')(config.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY);
    const endpointSecret = config.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object);
                break;

            case 'payment_intent.payment_failed':
                await handlePaymentFailure(event.data.object);
                break;

            case 'payment_method.attached':
                console.log('Payment method attached:', event.data.object.id);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });

    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

async function handlePaymentSuccess(paymentIntent) {
    console.log('Payment succeeded:', paymentIntent.id);

    const donationData = {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentType: paymentIntent.metadata.payment_type || 'one-time',
        timestamp: new Date().toISOString(),
        metadata: paymentIntent.metadata
    };

    // Log successful donation
    console.log('Donation recorded:', {
        id: paymentIntent.id,
        amount: `$${paymentIntent.amount / 100}`,
        type: donationData.paymentType
    });

    // For recurring donations, set up subscription
    if (donationData.paymentType === 'monthly') {
        await setupRecurringDonation(paymentIntent);
    }

    // Update Hall of Fame with donation
    await updateHallOfFame(donationData);

    // Here you could also:
    // - Send confirmation email
    // - Update database records
    // - Trigger analytics events

    return donationData;
}

async function handlePaymentFailure(paymentIntent) {
    console.log('Payment failed:', paymentIntent.id);
    console.log('Failure reason:', paymentIntent.last_payment_error?.message);

    // Log for monitoring
    console.error('Payment failure details:', {
        id: paymentIntent.id,
        amount: `$${paymentIntent.amount / 100}`,
        error: paymentIntent.last_payment_error?.message,
        code: paymentIntent.last_payment_error?.code
    });

    // Here you could:
    // - Send failure notification
    // - Log analytics
    // - Retry logic for certain error types
}

async function setupRecurringDonation(paymentIntent) {
    try {
        console.log('Setting up recurring donation for:', paymentIntent.id);

        // Get customer from payment intent
        const customerId = paymentIntent.customer;

        if (!customerId) {
            console.warn('No customer ID found for recurring donation setup');
            return false;
        }

        // Create donation product if it doesn't exist
        const donationAmount = paymentIntent.amount;

        // Create or get price for the specific amount
        const price = await stripe.prices.create({
            unit_amount: donationAmount,
            currency: paymentIntent.currency,
            recurring: { interval: 'month' },
            product_data: {
                name: 'Monthly Contribution to Terrell K. Flautt',
                description: `Monthly donation of $${donationAmount / 100}`
            },
            metadata: {
                payment_intent_id: paymentIntent.id,
                website: 'terrellflautt.com'
            }
        });

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: price.id }],
            payment_behavior: 'default_incomplete',
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription'
            },
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                original_payment_intent: paymentIntent.id,
                website: 'terrellflautt.com',
                donor_tier: getDonorTier(donationAmount)
            }
        });

        console.log('Recurring donation subscription created:', subscription.id);
        return subscription;

    } catch (error) {
        console.error('Recurring donation setup failed:', error);
        // Don't throw error - log and continue, one-time payment still succeeded
        return false;
    }
}

function getDonorTier(amount) {
    if (amount >= 10000) return 'Platinum Supporter'; // $100+
    if (amount >= 3000) return 'Gold Supporter';      // $30+
    if (amount >= 500) return 'Silver Supporter';     // $5+
    return 'Bronze Supporter';                        // $1+
}

async function updateHallOfFame(donationData) {
    try {
        // This would integrate with the magic user system
        // For now, just log the donation for Hall of Fame tracking
        const tier = getDonorTier(donationData.amount);

        console.log('Hall of Fame update:', {
            amount: `$${donationData.amount / 100}`,
            tier: tier,
            type: donationData.paymentType,
            timestamp: donationData.timestamp
        });

        // TODO: Integrate with frontend Hall of Fame system
        // This could update a JSON file or database that the frontend reads

        return true;
    } catch (error) {
        console.error('Hall of Fame update failed:', error);
        return false;
    }
}