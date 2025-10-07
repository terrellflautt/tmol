#!/usr/bin/env node
// Create DynamoDB tables for user profile tracking

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({
    region: process.env.AWS_REGION || 'us-east-1'
});

async function createTables() {
    console.log('🔧 Creating DynamoDB tables...');

    // User Profiles Table
    const userProfilesParams = {
        TableName: 'terrellflautt-user-profiles',
        KeySchema: [
            { AttributeName: 'userId', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'userId', AttributeType: 'S' }
        ],
        BillingMode: 'PAY_PER_REQUEST',
        Tags: [
            { Key: 'Environment', Value: process.env.NODE_ENV || 'development' },
            { Key: 'Project', Value: 'terrellflautt-website' },
            { Key: 'Purpose', Value: 'user-profile-tracking' }
        ]
    };

    // User Tracking Table
    const userTrackingParams = {
        TableName: 'terrellflautt-user-tracking',
        KeySchema: [
            { AttributeName: 'userId', KeyType: 'HASH' },
            { AttributeName: 'timestamp', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'userId', AttributeType: 'S' },
            { AttributeName: 'timestamp', AttributeType: 'N' }
        ],
        BillingMode: 'PAY_PER_REQUEST',
        Tags: [
            { Key: 'Environment', Value: process.env.NODE_ENV || 'development' },
            { Key: 'Project', Value: 'terrellflautt-website' },
            { Key: 'Purpose', Value: 'user-action-tracking' }
        ]
    };

    try {
        // Create User Profiles table
        console.log('📋 Creating terrellflautt-user-profiles table...');
        try {
            await dynamodb.createTable(userProfilesParams).promise();
            console.log('✅ terrellflautt-user-profiles table created successfully');
        } catch (error) {
            if (error.code === 'ResourceInUseException') {
                console.log('⚠️  terrellflautt-user-profiles table already exists');
            } else {
                throw error;
            }
        }

        // Create User Tracking table
        console.log('📋 Creating terrellflautt-user-tracking table...');
        try {
            await dynamodb.createTable(userTrackingParams).promise();
            console.log('✅ terrellflautt-user-tracking table created successfully');
        } catch (error) {
            if (error.code === 'ResourceInUseException') {
                console.log('⚠️  terrellflautt-user-tracking table already exists');
            } else {
                throw error;
            }
        }

        // Wait for tables to become active
        console.log('⏳ Waiting for tables to become active...');

        await Promise.all([
            dynamodb.waitFor('tableExists', { TableName: 'terrellflautt-user-profiles' }).promise(),
            dynamodb.waitFor('tableExists', { TableName: 'terrellflautt-user-tracking' }).promise()
        ]);

        console.log('🎉 All tables are now active and ready to use!');

        // Display table information
        const profileTable = await dynamodb.describeTable({ TableName: 'terrellflautt-user-profiles' }).promise();
        const trackingTable = await dynamodb.describeTable({ TableName: 'terrellflautt-user-tracking' }).promise();

        console.log('\n📊 Table Information:');
        console.log(`👤 User Profiles: ${profileTable.Table.TableStatus} - ${profileTable.Table.TableArn}`);
        console.log(`📈 User Tracking: ${trackingTable.Table.TableStatus} - ${trackingTable.Table.TableArn}`);

    } catch (error) {
        console.error('❌ Error creating tables:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    createTables().then(() => {
        console.log('\n✨ DynamoDB setup complete!');
        process.exit(0);
    }).catch(error => {
        console.error('💥 Setup failed:', error);
        process.exit(1);
    });
}

module.exports = { createTables };