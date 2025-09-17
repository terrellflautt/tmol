#!/bin/bash

# Terrell Flautt Website Deployment Script with SSL
# This script deploys the website to AWS S3 and CloudFront with SSL certificate

set -e

# Configuration
BUCKET_NAME="terrellflautt-com"
CLOUDFRONT_DISTRIBUTION_ID=""  # Will be set after CloudFront creation
AWS_REGION="us-east-1"  # Required for CloudFront and SSL certificates
DOMAIN_NAME="terrellflautt.com"
WWW_DOMAIN="www.terrellflautt.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploying Terrell Flautt Website to AWS with SSL${NC}"
echo "======================================================"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ jq is not installed. Please install it first.${NC}"
    echo "Visit: https://stedolan.github.io/jq/download/"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure'${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured${NC}"

# Step 1: Request SSL Certificate
echo -e "${BLUE}🔒 Step 1: Requesting SSL Certificate...${NC}"

# Check if certificate already exists
EXISTING_CERT=$(aws acm list-certificates --region $AWS_REGION --query "CertificateSummaryList[?DomainName=='$DOMAIN_NAME'].CertificateArn" --output text)

if [ -z "$EXISTING_CERT" ]; then
    echo -e "${YELLOW}📜 Requesting new SSL certificate for $DOMAIN_NAME and $WWW_DOMAIN...${NC}"

    CERT_OUTPUT=$(aws acm request-certificate \
        --domain-name $DOMAIN_NAME \
        --subject-alternative-names $WWW_DOMAIN \
        --validation-method DNS \
        --region $AWS_REGION \
        --output json)

    CERTIFICATE_ARN=$(echo $CERT_OUTPUT | jq -r '.CertificateArn')
    echo -e "${GREEN}✅ SSL certificate requested: $CERTIFICATE_ARN${NC}"

    # Get DNS validation records
    echo -e "${BLUE}📋 Getting DNS validation records...${NC}"
    sleep 5  # Wait for AWS to generate validation records

    VALIDATION_RECORDS=$(aws acm describe-certificate \
        --certificate-arn $CERTIFICATE_ARN \
        --region $AWS_REGION \
        --query 'Certificate.DomainValidationOptions' \
        --output json)

    echo -e "${YELLOW}🔔 IMPORTANT: You need to add these DNS validation records to IONOS:${NC}"
    echo "=================================================================="

    echo $VALIDATION_RECORDS | jq -r '.[] | "Domain: \(.DomainName)\nType: CNAME\nName: \(.ResourceRecord.Name)\nValue: \(.ResourceRecord.Value)\n"'

    echo "=================================================================="
    echo -e "${RED}⚠️  Please add these CNAME records to IONOS DNS and press ENTER to continue...${NC}"
    read -r

    echo -e "${BLUE}⏳ Waiting for certificate validation...${NC}"
    aws acm wait certificate-validated --certificate-arn $CERTIFICATE_ARN --region $AWS_REGION
    echo -e "${GREEN}✅ SSL certificate validated!${NC}"

else
    CERTIFICATE_ARN=$EXISTING_CERT
    echo -e "${YELLOW}⚠️  SSL certificate already exists: $CERTIFICATE_ARN${NC}"
fi

# Step 2: Create S3 bucket and upload files
echo -e "${BLUE}📦 Step 2: Setting up S3 bucket...${NC}"

if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION
    echo -e "${GREEN}✅ S3 bucket created: $BUCKET_NAME${NC}"
else
    echo -e "${YELLOW}⚠️  S3 bucket already exists: $BUCKET_NAME${NC}"
fi

# Configure S3 bucket for static website hosting
echo -e "${BLUE}🌐 Configuring S3 bucket for static hosting...${NC}"
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set S3 bucket policy for CloudFront access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontAccess",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json
rm bucket-policy.json

echo -e "${GREEN}✅ S3 bucket configured${NC}"

# Upload website files to S3
echo -e "${BLUE}📁 Uploading website files to S3...${NC}"
aws s3 sync . s3://$BUCKET_NAME \
    --exclude "*.sh" \
    --exclude "*.json" \
    --exclude "*.md" \
    --exclude ".git/*" \
    --exclude "node_modules/*" \
    --delete \
    --cache-control "max-age=31536000" \
    --metadata-directive REPLACE

# Set proper content types and cache headers
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html \
    --content-type "text/html" \
    --cache-control "max-age=0, must-revalidate" \
    --metadata-directive REPLACE

aws s3 cp s3://$BUCKET_NAME/styles.css s3://$BUCKET_NAME/styles.css \
    --content-type "text/css" \
    --cache-control "max-age=31536000" \
    --metadata-directive REPLACE

aws s3 cp s3://$BUCKET_NAME/script.js s3://$BUCKET_NAME/script.js \
    --content-type "application/javascript" \
    --cache-control "max-age=31536000" \
    --metadata-directive REPLACE

aws s3 cp s3://$BUCKET_NAME/favicon.svg s3://$BUCKET_NAME/favicon.svg \
    --content-type "image/svg+xml" \
    --cache-control "max-age=31536000" \
    --metadata-directive REPLACE

echo -e "${GREEN}✅ Website files uploaded to S3${NC}"

# Step 3: Create CloudFront distribution with SSL
echo -e "${BLUE}🌍 Step 3: Setting up CloudFront distribution with SSL...${NC}"

# Check if distribution already exists
EXISTING_DISTRIBUTION=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='$DOMAIN_NAME'].Id" --output text)

if [ -z "$EXISTING_DISTRIBUTION" ]; then
    # Create CloudFront distribution configuration with SSL
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
                "DomainName": "$BUCKET_NAME.s3.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
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
            "Cookies": {"Forward": "none"},
            "Headers": {
                "Quantity": 0,
                "Items": []
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "CacheBehaviors": {
        "Quantity": 2,
        "Items": [
            {
                "PathPattern": "*.css",
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
                "MinTTL": 31536000,
                "DefaultTTL": 31536000,
                "MaxTTL": 31536000,
                "Compress": true
            },
            {
                "PathPattern": "*.js",
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
                "MinTTL": 31536000,
                "DefaultTTL": 31536000,
                "MaxTTL": 31536000,
                "Compress": true
            }
        ]
    },
    "Enabled": true,
    "Aliases": {
        "Quantity": 2,
        "Items": ["$DOMAIN_NAME", "$WWW_DOMAIN"]
    },
    "PriceClass": "PriceClass_100",
    "ViewerCertificate": {
        "ACMCertificateArn": "$CERTIFICATE_ARN",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021"
    },
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            },
            {
                "ErrorCode": 403,
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

# Step 4: Get CloudFront IP addresses
echo -e "${BLUE}🌐 Step 4: Getting CloudFront IP addresses...${NC}"

echo -e "${YELLOW}⏳ Waiting for CloudFront to be accessible...${NC}"
sleep 30

# Get IP addresses using multiple methods
echo -e "${BLUE}🔍 Resolving CloudFront IP addresses...${NC}"

# Method 1: Direct dig
CLOUDFRONT_IPS_DIG=$(dig +short $CLOUDFRONT_DOMAIN | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' | head -4)

# Method 2: Using nslookup as backup
CLOUDFRONT_IPS_NS=$(nslookup $CLOUDFRONT_DOMAIN | grep "Address:" | grep -v "#" | awk '{print $2}' | head -4)

# Use dig results, fallback to nslookup
if [ ! -z "$CLOUDFRONT_IPS_DIG" ]; then
    CLOUDFRONT_IPS="$CLOUDFRONT_IPS_DIG"
else
    CLOUDFRONT_IPS="$CLOUDFRONT_IPS_NS"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}🎉 Deployment Summary${NC}"
echo "=================================================="
echo -e "${BLUE}S3 Bucket:${NC} $BUCKET_NAME"
echo -e "${BLUE}CloudFront Distribution ID:${NC} $CLOUDFRONT_DISTRIBUTION_ID"
echo -e "${BLUE}CloudFront Domain:${NC} $CLOUDFRONT_DOMAIN"
echo -e "${BLUE}SSL Certificate:${NC} $CERTIFICATE_ARN"
echo ""
echo -e "${PURPLE}🔒 SSL Certificate Status:${NC} Validated and Active"
echo -e "${PURPLE}🌍 HTTPS URLs:${NC}"
echo "   - https://$DOMAIN_NAME"
echo "   - https://$WWW_DOMAIN"
echo ""
echo -e "${YELLOW}📋 IONOS DNS Configuration:${NC}"
echo "=================================================="
echo ""
echo -e "${BLUE}1. A Records for root domain ($DOMAIN_NAME):${NC}"
if [ ! -z "$CLOUDFRONT_IPS" ]; then
    for ip in $CLOUDFRONT_IPS; do
        echo "   Type: A"
        echo "   Name: @ (or leave blank)"
        echo "   Value: $ip"
        echo "   TTL: 300"
        echo ""
    done
else
    echo "   ⚠️  Could not resolve IPs yet. CloudFront may still be deploying."
    echo "   Run this command in 10-15 minutes: dig $CLOUDFRONT_DOMAIN"
    echo ""
fi

echo -e "${BLUE}2. CNAME Record for www subdomain:${NC}"
echo "   Type: CNAME"
echo "   Name: www"
echo "   Value: $CLOUDFRONT_DOMAIN"
echo "   TTL: 300"
echo ""

if [ -z "$CLOUDFRONT_IPS" ]; then
    echo -e "${YELLOW}🔧 To get IP addresses manually:${NC}"
    echo "   dig $CLOUDFRONT_DOMAIN"
    echo "   nslookup $CLOUDFRONT_DOMAIN"
    echo ""
fi

echo -e "${GREEN}✅ Deployment complete with SSL!${NC}"
echo -e "${YELLOW}⏳ Please wait 15-20 minutes for CloudFront to fully deploy before updating DNS.${NC}"
echo -e "${BLUE}🔗 Test URLs after DNS propagation:${NC}"
echo "   - https://$DOMAIN_NAME"
echo "   - https://$WWW_DOMAIN"

# Save important info to file
cat > deployment-info.txt << EOF
Deployment Information - $(date)
================================

S3 Bucket: $BUCKET_NAME
CloudFront Distribution ID: $CLOUDFRONT_DISTRIBUTION_ID
CloudFront Domain: $CLOUDFRONT_DOMAIN
SSL Certificate ARN: $CERTIFICATE_ARN

CloudFront IP Addresses:
$CLOUDFRONT_IPS

IONOS DNS Configuration:
- A Records (root): Use the IP addresses above
- CNAME Record (www): $CLOUDFRONT_DOMAIN

Test URLs:
- https://$DOMAIN_NAME
- https://$WWW_DOMAIN
EOF

echo ""
echo -e "${GREEN}📄 Deployment info saved to: deployment-info.txt${NC}"