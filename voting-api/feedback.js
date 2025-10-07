const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const FEEDBACK_TABLE = process.env.FEEDBACK_TABLE;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: '',
      };
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    const { howDidYouFind, lookingFor, whatToSee, userAgent, ipAddress } = JSON.parse(event.body);

    if (!howDidYouFind || !lookingFor || !whatToSee) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All feedback fields are required' }),
      };
    }

    const feedbackId = uuidv4();
    const timestamp = new Date().toISOString();

    await dynamoDB.put({
      TableName: FEEDBACK_TABLE,
      Item: {
        feedbackId,
        howDidYouFind,
        lookingFor,
        whatToSee,
        timestamp,
        userAgent,
        ipAddress: ipAddress?.substring(0, 12), // Truncate for privacy
        processed: false
      }
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Feedback submitted successfully',
        feedbackId
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};