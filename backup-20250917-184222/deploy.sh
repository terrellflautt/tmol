#!/bin/bash

# Terrell Flautt Website Deployment Script
# This script deploys the website to AWS S3 and CloudFront

set -e

# Configuration
BUCKET_NAME="terrellflautt-com"
CLOUDFRONT_DISTRIBUTION_ID=""  # Will be set after CloudFront creation
AWS_REGION="us-east-1"  # Required for CloudFront
DOMAIN_NAME="terrellflautt.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploying Terrell Flautt Website to AWS${NC}"
echo "=================================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure'${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured${NC}"

# Create S3 bucket if it doesn't exist
echo -e "${BLUE}📦 Creating S3 bucket...${NC}"
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION
    echo -e "${GREEN}✅ S3 bucket created: $BUCKET_NAME${NC}"
else
    echo -e "${YELLOW}⚠️  S3 bucket already exists: $BUCKET_NAME${NC}"
fi

# Configure S3 bucket for static website hosting
echo -e "${BLUE}🌐 Configuring S3 bucket for static hosting...${NC}"
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set S3 bucket policy for public read access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json
rm bucket-policy.json

echo -e "${GREEN}✅ S3 bucket configured for static hosting${NC}"

# Upload website files to S3
echo -e "${BLUE}📁 Uploading website files to S3...${NC}"
aws s3 sync . s3://$BUCKET_NAME --exclude "*.sh" --exclude "*.json" --exclude "*.md" --exclude ".git/*" --exclude "node_modules/*" --delete

# Set proper content types
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --content-type "text/html" --metadata-directive REPLACE
aws s3 cp s3://$BUCKET_NAME/styles.css s3://$BUCKET_NAME/styles.css --content-type "text/css" --metadata-directive REPLACE
aws s3 cp s3://$BUCKET_NAME/script.js s3://$BUCKET_NAME/script.js --content-type "application/javascript" --metadata-directive REPLACE
aws s3 cp s3://$BUCKET_NAME/favicon.svg s3://$BUCKET_NAME/favicon.svg --content-type "image/svg+xml" --metadata-directive REPLACE

echo -e "${GREEN}✅ Website files uploaded to S3${NC}"

# Get S3 website endpoint
S3_WEBSITE_ENDPOINT=$(aws s3api get-bucket-website --bucket $BUCKET_NAME --query 'IndexDocument.Suffix' --output text 2>/dev/null || echo "index.html")
S3_WEBSITE_URL="http://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com"

echo -e "${GREEN}✅ S3 Website URL: $S3_WEBSITE_URL${NC}"

# Create CloudFront distribution if it doesn't exist
echo -e "${BLUE}🌍 Setting up CloudFront distribution...${NC}"

# Check if distribution already exists
EXISTING_DISTRIBUTION=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='$DOMAIN_NAME'].Id" --output text)

if [ -z "$EXISTING_DISTRIBUTION" ]; then
    # Create CloudFront distribution configuration
    cat > cloudfront-config.json << EOF
{
    "CallerReference": "$DOMAIN_NAME-$(date +%s)",
    "Comment": "$DOMAIN_NAME",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "$BUCKET_NAME-origin",
                "DomainName": "$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "$BUCKET_NAME-origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {"Forward": "none"}
        },
        "MinTTL": 0,
        "Compress": true
    },
    "Enabled": true,
    "Aliases": {
        "Quantity": 2,
        "Items": ["$DOMAIN_NAME", "www.$DOMAIN_NAME"]
    },
    "PriceClass": "PriceClass_100",
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
EOF

    # Create CloudFront distribution
    DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config file://cloudfront-config.json)
    CLOUDFRONT_DISTRIBUTION_ID=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.Id')
    CLOUDFRONT_DOMAIN=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.DomainName')

    rm cloudfront-config.json

    echo -e "${GREEN}✅ CloudFront distribution created: $CLOUDFRONT_DISTRIBUTION_ID${NC}"
    echo -e "${GREEN}✅ CloudFront domain: $CLOUDFRONT_DOMAIN${NC}"
    echo -e "${YELLOW}⏳ Distribution is deploying... This may take 15-20 minutes.${NC}"
else
    CLOUDFRONT_DISTRIBUTION_ID=$EXISTING_DISTRIBUTION
    CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution --id $CLOUDFRONT_DISTRIBUTION_ID --query 'Distribution.DomainName' --output text)
    echo -e "${YELLOW}⚠️  CloudFront distribution already exists: $CLOUDFRONT_DISTRIBUTION_ID${NC}"
    echo -e "${GREEN}✅ CloudFront domain: $CLOUDFRONT_DOMAIN${NC}"

    # Invalidate CloudFront cache
    echo -e "${BLUE}🔄 Invalidating CloudFront cache...${NC}"
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
    echo -e "${GREEN}✅ Cache invalidation initiated${NC}"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}🎉 Deployment Summary${NC}"
echo "=================================================="
echo -e "${BLUE}S3 Bucket:${NC} $BUCKET_NAME"
echo -e "${BLUE}S3 Website URL:${NC} $S3_WEBSITE_URL"
echo -e "${BLUE}CloudFront Distribution ID:${NC} $CLOUDFRONT_DISTRIBUTION_ID"
echo -e "${BLUE}CloudFront Domain:${NC} $CLOUDFRONT_DOMAIN"
echo ""
echo -e "${YELLOW}📋 DNS Configuration for IONOS:${NC}"
echo "=================================================="
echo -e "${BLUE}1. A Record for root domain:${NC}"
echo "   Type: A"
echo "   Name: @"
echo "   Value: [CloudFront IP - see instructions below]"
echo ""
echo -e "${BLUE}2. CNAME Record for www subdomain:${NC}"
echo "   Type: CNAME"
echo "   Name: www"
echo "   Value: $CLOUDFRONT_DOMAIN"
echo ""
echo -e "${BLUE}3. For the A record, you'll need to:${NC}"
echo "   - Wait for CloudFront to deploy (15-20 minutes)"
echo "   - Use 'dig $CLOUDFRONT_DOMAIN' to get the IP addresses"
echo "   - Or contact AWS support for the current CloudFront IP ranges"
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${YELLOW}⏳ Please wait 15-20 minutes for CloudFront to fully deploy before updating DNS.${NC}"