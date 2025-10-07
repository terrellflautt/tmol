#!/bin/bash

echo "🚀 Deploying Voting API to api.terrellflautt.com"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create SSL certificate for api.terrellflautt.com
echo "🔐 Creating SSL certificate..."
aws acm request-certificate \
  --domain-name api.terrellflautt.com \
  --validation-method DNS \
  --region us-east-1

echo "⚠️  IMPORTANT: Add DNS validation record to IONOS before continuing!"
echo "   Check AWS Certificate Manager console for validation record"
echo ""
read -p "Press Enter after adding DNS validation record to IONOS..."

# Create custom domain
echo "🌐 Creating custom domain..."
npx serverless create_domain

# Deploy the API
echo "⚡ Deploying API..."
npx serverless deploy

# Get the API Gateway domain name for DNS
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Add this CNAME record to IONOS:"
echo "   Name: api"
echo "   Type: CNAME"
echo "   Value: [Check API Gateway console for domain name]"
echo ""
echo "🔗 Your API will be available at: https://api.terrellflautt.com"