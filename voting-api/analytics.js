const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async (event) => {
  try {
    // Get vote counts
    const voteResult = await dynamoDB.scan({
      TableName: process.env.VOTES_TABLE
    }).promise();

    const voteCounts = {};
    voteResult.Items.forEach(item => {
      voteCounts[item.projectId] = (voteCounts[item.projectId] || 0) + 1;
    });

    // Get feedback count
    const feedbackResult = await dynamoDB.scan({
      TableName: process.env.FEEDBACK_TABLE,
      Select: 'COUNT'
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        voteCounts,
        totalVotes: voteResult.Count,
        totalFeedback: feedbackResult.Count,
        lastUpdated: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get analytics' }),
    };
  }
};