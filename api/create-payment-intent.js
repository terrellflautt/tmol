// Stripe Payment Intent API Endpoint
// This handles creating payment intents for donations

module.exports = async (req, res) => {
    // Get configuration from app locals (set by server.js)
    const config = req.app.locals.config || {};

    // Initialize Stripe with configuration
    const stripe = require('stripe')(config.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY);
    // CORS headers for frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, currency = 'usd', payment_type, metadata = {} } = req.body;

        // Validation
        if (!amount || amount < 50) { // Minimum $0.50
            return res.status(400).json({
                error: 'Invalid amount. Minimum donation is $0.50'
            });
        }

        if (amount > 1000000) { // Maximum $10,000
            return res.status(400).json({
                error: 'Amount too large. Maximum donation is $10,000'
            });
        }

        // Create payment intent configuration
        const paymentIntentData = {
            amount: Math.round(amount), // Amount in cents
            currency: currency.toLowerCase(),
            metadata: {
                ...metadata,
                payment_type,
                website: 'terrellflautt.com',
                timestamp: new Date().toISOString()
            },
            description: `Donation to Terrell K. Flautt - ${payment_type === 'monthly' ? 'Monthly' : 'One-time'} contribution`
        };

        // For recurring donations, create customer and setup for subscription
        if (payment_type === 'monthly') {
            paymentIntentData.metadata.is_recurring = 'true';
            paymentIntentData.setup_future_usage = 'off_session';

            // Create customer for recurring payments
            const customer = await stripe.customers.create({
                metadata: {
                    website: 'terrellflautt.com',
                    donation_amount: amount,
                    signup_date: new Date().toISOString()
                }
            });

            paymentIntentData.customer = customer.id;
            paymentIntentData.metadata.customer_id = customer.id;
        }

        // Create the payment intent
        const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

        // Log successful creation (for monitoring)
        console.log(`Payment intent created: ${paymentIntent.id} for $${amount/100}`);

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {
        console.error('Payment intent creation error:', error);

        // Handle specific Stripe errors
        if (error.type === 'StripeCardError') {
            return res.status(400).json({ error: error.message });
        }

        if (error.type === 'StripeRateLimitError') {
            return res.status(429).json({ error: 'Too many requests, please try again later' });
        }

        if (error.type === 'StripeInvalidRequestError') {
            return res.status(400).json({ error: 'Invalid request parameters' });
        }

        if (error.type === 'StripeAPIError') {
            return res.status(500).json({ error: 'Payment processing temporarily unavailable' });
        }

        if (error.type === 'StripeConnectionError') {
            return res.status(500).json({ error: 'Network error, please try again' });
        }

        if (error.type === 'StripeAuthenticationError') {
            return res.status(500).json({ error: 'Payment configuration error' });
        }

        // Generic error for unexpected issues
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again.'
        });
    }
};