/**
 * AWS SDK instrumented with X-Ray tracing
 * Import this instead of 'aws-sdk' to get automatic tracing
 */

const AWSXRay = require('aws-xray-sdk-core');
const AWS = require('aws-sdk');

// Instrument AWS SDK for X-Ray tracing
const instrumentedAWS = AWSXRay.captureAWS(AWS);

module.exports = instrumentedAWS;
