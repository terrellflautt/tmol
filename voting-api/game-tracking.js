const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    if (method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers
      };
    }

    if (method === 'POST') {
      return await trackGameEvent(event);
    } else if (method === 'GET') {
      return await getGameEvents(event);
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Game tracking error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};

async function trackGameEvent(event) {
  const body = JSON.parse(event.body);
  const { userId, eventType, data } = body;

  if (!userId || !eventType) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'userId and eventType required' }),
    };
  }

  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 11);
  const eventId = timestamp + '_' + randomStr;

  // Store game event
  await dynamoDB.put({
    TableName: process.env.TRACKING_EVENTS_TABLE,
    Item: {
      userId,
      eventId,
      timestamp,
      eventType,
      eventData: data || {},
      ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
    }
  }).promise();

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      eventId,
      timestamp
    }),
  };
}

async function getGameEvents(event) {
  const userId = event.pathParameters?.userId;

  if (!userId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'userId required' }),
    };
  }

  try {
    const result = await dynamoDB.query({
      TableName: process.env.TRACKING_EVENTS_TABLE,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ScanIndexForward: false,
      Limit: 1000
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        userId,
        events: result.Items || [],
        count: result.Items ? result.Items.length : 0
      }),
    };

  } catch (error) {
    console.error('Error getting game events:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get game events', details: error.message }),
    };
  }
}