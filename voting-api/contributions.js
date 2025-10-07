const AWS = require('aws-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const ssm = new AWS.SSM();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

/**
 * Universal contribution handler - supports any amount, any project, any frequency
 */
exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers };
    }

    const {
      amount,
      frequency,  // 'one-time', 'monthly', or 'yearly'
      email,      // optional
      message,    // optional - which project to support
      userId,
      joinMailingList  // optional
    } = JSON.parse(event.body);

    if (!amount || !frequency) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Amount and frequency required' }),
      };
    }

    // Validate amount (minimum $1.00)
    if (amount < 100) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Minimum contribution is $1.00' }),
      };
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      amount,
      frequency,
      email,
      message,
      userId
    });

    // Log contribution attempt
    await logContribution({
      userId,
      amount,
      frequency,
      email,
      message,
      sessionId: session.id,
      status: 'pending',
      joinMailingList
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        sessionUrl: session.url
      }),
    };

  } catch (error) {
    console.error('Contribution error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message }),
    };
  }
};

/**
 * Create Stripe Checkout Session
 */
async function createCheckoutSession({ amount, frequency, email, message, userId }) {
  const isRecurring = frequency === 'monthly' || frequency === 'yearly';
  const interval = frequency === 'yearly' ? 'year' : 'month';

  const sessionConfig = {
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Support terrellflautt.com',
            description: message || 'General contribution to open source projects',
          },
          unit_amount: Math.round(amount),
          ...(isRecurring && {
            recurring: { interval }
          })
        },
        quantity: 1,
      },
    ],
    mode: isRecurring ? 'subscription' : 'payment',
    success_url: `https://terrellflautt.com/?contribution=success`,
    cancel_url: `https://terrellflautt.com/?contribution=cancelled`,
    customer_email: email || undefined,
    metadata: {
      userId,
      frequency,
      message: message || 'General support',
      source: 'terrellflautt.com'
    }
  };

  return await stripe.checkout.sessions.create(sessionConfig);
}

/**
 * Log contribution to DynamoDB
 */
async function logContribution({ userId, amount, frequency, email, message, sessionId, status, joinMailingList }) {
  const DONATIONS_TABLE = process.env.DONATIONS_TABLE;

  try {
    await dynamoDB.put({
      TableName: DONATIONS_TABLE,
      Item: {
        sessionId,
        userId,
        amount,
        frequency,
        email: email || null,
        message: message || 'General support',
        status,
        joinMailingList: joinMailingList || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }).promise();

    // Award Hall of Fame points for contribution attempts
    if (status === 'pending') {
      await updateHallOfFameForContribution(userId, amount);
    }
  } catch (error) {
    console.error('Failed to log contribution:', error);
  }
}

/**
 * Award Hall of Fame points for contributions
 * Bigger contributions = more points
 */
async function updateHallOfFameForContribution(userId, amount) {
  const HALL_OF_FAME_TABLE = process.env.HALL_OF_FAME_TABLE;

  // Calculate points based on contribution amount
  // $5 = 5 points, $10 = 10 points, etc.
  const points = Math.floor(amount / 100);

  try {
    await dynamoDB.update({
      TableName: HALL_OF_FAME_TABLE,
      Key: {
        category: 'overall',
        userId
      },
      UpdateExpression: 'ADD points :points, contributionsMade :inc, totalContributed :amount SET username = if_not_exists(username, :username), lastActivity = :timestamp',
      ExpressionAttributeValues: {
        ':points': points,
        ':inc': 1,
        ':amount': amount,
        ':username': `Contributor_${userId.substring(0, 8)}`,
        ':timestamp': new Date().toISOString()
      }
    }).promise();
  } catch (error) {
    console.error('Hall of Fame update error:', error);
  }
}

/**
 * Webhook handler for Stripe events
 */
exports.webhook = async (event) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);

    // Handle successful payment
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;

      await dynamoDB.update({
        TableName: process.env.DONATIONS_TABLE,
        Key: { sessionId: session.id },
        UpdateExpression: 'SET #status = :status, completedAt = :timestamp, customerEmail = :email',
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ExpressionAttributeValues: {
          ':status': 'completed',
          ':timestamp': new Date().toISOString(),
          ':email': session.customer_email
        }
      }).promise();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
