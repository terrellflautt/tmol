const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const VOTES_TABLE = process.env.VOTES_TABLE;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    if (method === 'POST') {
      return await handleVote(event);
    } else if (method === 'GET') {
      return await getVotes(event);
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
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

async function handleVote(event) {
  const { projectId, userId, userAgent, ipAddress } = JSON.parse(event.body);

  if (!projectId || !userId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'ProjectId and userId are required' }),
    };
  }

  const timestamp = new Date().toISOString();
  const voteId = `${projectId}-${userId}`;

  // Check if user already upvoted this project
  const existingVote = await dynamoDB.get({
    TableName: VOTES_TABLE,
    Key: { projectId, userId }
  }).promise();

  if (existingVote.Item) {
    // User already upvoted, remove upvote (toggle off)
    await dynamoDB.delete({
      TableName: VOTES_TABLE,
      Key: { projectId, userId }
    }).promise();

    // Remove Hall of Fame point
    await updateHallOfFamePoints(userId, -1);

    const newCount = await getProjectVoteCount(projectId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Upvote removed',
        voted: false,
        count: newCount,
        action: 'removed'
      }),
    };
  } else {
    // Add new upvote (one per user per project)
    await dynamoDB.put({
      TableName: VOTES_TABLE,
      Item: {
        projectId,
        userId,
        timestamp,
        userAgent,
        ipAddress: ipAddress?.substring(0, 12), // Truncate for privacy
        voteId,
        voteType: 'upvote' // Only upvotes allowed
      }
    }).promise();

    // Award Hall of Fame point (1 point per vote)
    await updateHallOfFamePoints(userId, 1);

    const newCount = await getProjectVoteCount(projectId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Upvote recorded',
        voted: true,
        count: newCount,
        action: 'added',
        hallOfFamePoints: '+1'
      }),
    };
  }
}

// Update Hall of Fame points
async function updateHallOfFamePoints(userId, points) {
  const HALL_OF_FAME_TABLE = process.env.HALL_OF_FAME_TABLE;

  try {
    await dynamoDB.update({
      TableName: HALL_OF_FAME_TABLE,
      Key: { userId },
      UpdateExpression: 'ADD points :points, votesGiven :inc SET username = if_not_exists(username, :username), lastActivity = :timestamp',
      ExpressionAttributeValues: {
        ':points': points,
        ':inc': points > 0 ? 1 : -1,
        ':username': `Explorer_${userId.substring(0, 8)}`,
        ':timestamp': new Date().toISOString()
      }
    }).promise();
  } catch (error) {
    console.error('Hall of Fame update error:', error);
    // Don't fail the vote if Hall of Fame update fails
  }
}

async function getVotes(event) {
  const projectId = event.pathParameters?.projectId;

  if (projectId) {
    // Get votes for specific project
    const count = await getProjectVoteCount(projectId);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ projectId, count }),
    };
  } else {
    // Get all project vote counts
    const result = await dynamoDB.scan({
      TableName: VOTES_TABLE,
      ProjectionExpression: 'projectId'
    }).promise();

    const voteCounts = {};
    for (const item of result.Items) {
      if (!voteCounts[item.projectId]) {
        voteCounts[item.projectId] = 0;
      }
      voteCounts[item.projectId]++;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ voteCounts }),
    };
  }
}

async function getProjectVoteCount(projectId) {
  const result = await dynamoDB.query({
    TableName: VOTES_TABLE,
    IndexName: 'ProjectVotesIndex',
    KeyConditionExpression: 'projectId = :projectId',
    ExpressionAttributeValues: {
      ':projectId': projectId
    },
    Select: 'COUNT'
  }).promise();

  return result.Count;
}