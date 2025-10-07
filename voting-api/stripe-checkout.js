const AWS = require('aws-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const dynamodb = new AWS.DynamoDB.DocumentClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event) => {
    try {
        const method = event.httpMethod;

        if (method === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: corsHeaders
            };
        }

        if (method === 'POST') {
            return await createCheckoutSession(event);
        }

        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

async function createCheckoutSession(event) {
    const body = JSON.parse(event.body);
    const { amount, userId, email, rewardTier } = body;

    if (!amount || !userId || !email) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Amount, userId, and email are required' })
        };
    }

    try {
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Digital Journey Support - ${rewardTier || 'Supporter'}`,
                        description: 'Support the terrellflautt.com digital experience and unlock exclusive features',
                        images: ['https://terrellflautt.com/aziza.webp'], // Use your actual image URL
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `https://terrellflautt.com/?donation_success=true&amount=${amount/100}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'https://terrellflautt.com/?donation_cancelled=true',
            customer_email: email,
            metadata: {
                userId: userId,
                rewardTier: rewardTier || 'supporter',
                amount: (amount / 100).toString()
            }
        });

        // Store donation intent in DynamoDB
        await dynamodb.put({
            TableName: process.env.DONATIONS_TABLE || 'terrellflautt-voting-api-prod-donations',
            Item: {
                sessionId: session.id,
                userId: userId,
                email: email,
                amount: amount / 100,
                rewardTier: rewardTier || 'supporter',
                status: 'pending',
                createdAt: new Date().toISOString(),
                ttl: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours TTL
            }
        }).promise();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                sessionId: session.id,
                url: session.url
            })
        };

    } catch (error) {
        console.error('Stripe error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: 'Failed to create checkout session',
                details: error.message
            })
        };
    }
}

// Webhook handler for Stripe events
exports.webhookHandler = async (event) => {
    const sig = event.headers['stripe-signature'];
    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid signature' })
        };
    }

    // Handle the event
    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                await handleSuccessfulPayment(stripeEvent.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handleFailedPayment(stripeEvent.data.object);
                break;
            default:
                console.log(`Unhandled event type ${stripeEvent.type}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ received: true })
        };

    } catch (error) {
        console.error('Webhook handler error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Webhook handler failed' })
        };
    }
};

async function handleSuccessfulPayment(session) {
    const { metadata, customer_email, amount_total } = session;

    try {
        // Update donation record
        await dynamodb.update({
            TableName: process.env.DONATIONS_TABLE || 'terrellflautt-voting-api-prod-donations',
            Key: { sessionId: session.id },
            UpdateExpression: 'SET #status = :status, completedAt = :completedAt, stripeSessionData = :sessionData',
            ExpressionAttributeNames: {
                '#status': 'status'
            },
            ExpressionAttributeValues: {
                ':status': 'completed',
                ':completedAt': new Date().toISOString(),
                ':sessionData': session
            }
        }).promise();

        // Update user's donater status in tracking table
        if (metadata.userId) {
            await dynamodb.update({
                TableName: process.env.TRACKING_TABLE || 'terrellflautt-voting-api-prod-tracking',
                Key: { userId: metadata.userId },
                UpdateExpression: 'SET isDonater = :isDonater, donationTotal = if_not_exists(donationTotal, :zero) + :amount, lastDonation = :timestamp',
                ExpressionAttributeValues: {
                    ':isDonater': true,
                    ':amount': amount_total / 100,
                    ':zero': 0,
                    ':timestamp': new Date().toISOString()
                }
            }).promise();

            // Add donation event
            await dynamodb.put({
                TableName: process.env.TRACKING_EVENTS_TABLE || 'terrellflautt-voting-api-prod-tracking-events',
                Item: {
                    userId: metadata.userId,
                    eventId: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    timestamp: Date.now(),
                    eventType: 'donation_completed',
                    eventData: {
                        amount: amount_total / 100,
                        rewardTier: metadata.rewardTier,
                        sessionId: session.id
                    },
                    ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year TTL
                }
            }).promise();
        }

        console.log(`Payment successful for user ${metadata.userId}: $${amount_total / 100}`);

    } catch (error) {
        console.error('Error handling successful payment:', error);
    }
}

async function handleFailedPayment(paymentIntent) {
    console.log('Payment failed:', paymentIntent.id);

    // Could add logic here to handle failed payments
    // For example, updating the donation record status to 'failed'
}