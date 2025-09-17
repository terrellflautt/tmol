# DNS Configuration Guide for IONOS

## Overview

After deploying your website to AWS CloudFront, you'll need to configure DNS records in IONOS to point your domain `terrellflautt.com` to the CloudFront distribution.

## Required DNS Records

### 1. Root Domain (terrellflautt.com)

**Option A: ALIAS Record (Preferred if supported)**
- **Type**: ALIAS or ANAME
- **Name**: @ (or leave blank for root)
- **Value**: `[your-cloudfront-domain].cloudfront.net`
- **TTL**: 300 seconds

**Option B: A Record (Alternative)**
- **Type**: A
- **Name**: @ (or leave blank for root)
- **Value**: CloudFront IP addresses (see below for how to get these)
- **TTL**: 300 seconds

### 2. WWW Subdomain (www.terrellflautt.com)

- **Type**: CNAME
- **Name**: www
- **Value**: `[your-cloudfront-domain].cloudfront.net`
- **TTL**: 300 seconds

## Step-by-Step Configuration in IONOS

### Step 1: Access DNS Management

1. Log into your IONOS account
2. Navigate to "Domains & SSL"
3. Find `terrellflautt.com` and click "Manage"
4. Go to "DNS" section

### Step 2: Configure Root Domain

#### If IONOS supports ALIAS/ANAME records:
1. Click "Add Record"
2. Select "ALIAS" or "ANAME" type
3. Leave name field empty or enter "@"
4. Enter your CloudFront domain (from deployment output)
5. Set TTL to 300
6. Save the record

#### If only A records are supported:
1. First, get CloudFront IP addresses:
   ```bash
   # Run this command after CloudFront deployment is complete
   dig [your-cloudfront-domain].cloudfront.net
   ```
2. Click "Add Record"
3. Select "A" type
4. Leave name field empty or enter "@"
5. Enter the IP addresses (one record per IP)
6. Set TTL to 300
7. Save the records

### Step 3: Configure WWW Subdomain

1. Click "Add Record"
2. Select "CNAME" type
3. Enter "www" in the name field
4. Enter your CloudFront domain in the value field
5. Set TTL to 300
6. Save the record

## Getting CloudFront Information

After running the deployment script, you'll receive output similar to:

```
CloudFront Distribution ID: E1234567890ABC
CloudFront Domain: d1234567890abc.cloudfront.net
```

Use the CloudFront Domain for your DNS configuration.

## Verification Commands

After updating DNS records, verify the configuration:

```bash
# Check root domain
dig terrellflautt.com

# Check www subdomain
dig www.terrellflautt.com

# Test HTTP response
curl -I http://terrellflautt.com
curl -I http://www.terrellflautt.com
```

## Important Notes

### Propagation Time
- DNS changes may take 24-48 hours to fully propagate
- IONOS changes typically propagate within 1-4 hours
- Use online DNS propagation checkers to monitor progress

### SSL/HTTPS
- CloudFront provides free SSL certificates for *.cloudfront.net domains
- For custom domain SSL, you'll need to request an SSL certificate through AWS Certificate Manager
- The certificate must be requested in the US East (N. Virginia) region for CloudFront

### TTL Considerations
- Start with low TTL values (300 seconds) during initial setup
- Increase TTL to 3600 or higher after confirming everything works
- Lower TTL allows faster changes but increases DNS query load

## Advanced Configuration (Optional)

### Custom SSL Certificate

If you want HTTPS on your custom domain:

1. **Request Certificate in AWS Certificate Manager**:
   ```bash
   aws acm request-certificate \
     --domain-name terrellflautt.com \
     --subject-alternative-names www.terrellflautt.com \
     --validation-method DNS \
     --region us-east-1
   ```

2. **Validate Domain Ownership**:
   - AWS will provide DNS records to add in IONOS
   - Add the validation CNAME records
   - Wait for validation to complete

3. **Update CloudFront Distribution**:
   - Associate the certificate with your CloudFront distribution
   - Update viewer certificate settings

### Email Configuration

If you need email services for your domain:

1. **MX Records for Email**:
   - **Type**: MX
   - **Name**: @ (or leave blank)
   - **Value**: Your email provider's MX records
   - **Priority**: As specified by email provider

2. **Common Email Providers**:
   - **Google Workspace**: MX records provided by Google
   - **Microsoft 365**: MX records provided by Microsoft
   - **IONOS Email**: Use IONOS-provided MX records

## Troubleshooting

### Common Issues

1. **Site not loading**:
   - Check DNS propagation status
   - Verify CloudFront distribution is deployed
   - Confirm DNS records are correct

2. **SSL certificate errors**:
   - Ensure certificate covers both root and www domains
   - Check certificate validation status
   - Verify CloudFront SSL configuration

3. **Redirects not working**:
   - Check CloudFront behavior settings
   - Verify S3 bucket redirect configuration
   - Test different URL variations

### Helpful Tools

- **DNS Propagation Checker**: whatsmydns.net
- **SSL Certificate Checker**: ssllabs.com/ssltest
- **CloudFront Status**: AWS Console → CloudFront
- **Dig Command**: `dig @8.8.8.8 terrellflautt.com`

## Support Contacts

- **IONOS Support**: Available through your IONOS dashboard
- **AWS Support**: AWS Console → Support Center
- **DNS Issues**: Contact both IONOS and verify AWS configuration

## Final Checklist

Before going live:

- [ ] CloudFront distribution status shows "Deployed"
- [ ] DNS records added in IONOS
- [ ] DNS propagation confirmed
- [ ] Website loads at both terrellflautt.com and www.terrellflautt.com
- [ ] HTTPS working (if SSL certificate configured)
- [ ] All links and features functional
- [ ] Mobile responsiveness verified
- [ ] Performance tested

---

*For technical support or questions about this configuration, contact Terrell at tkflau@protonmail.com*