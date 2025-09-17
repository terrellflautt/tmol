# Complete IONOS DNS Setup for terrellflautt.com with SSL

## Overview

This guide provides step-by-step instructions for configuring DNS in IONOS to point your domain to CloudFront with SSL support and real IP addresses for A records.

## Prerequisites

- AWS account with appropriate permissions
- Domain `terrellflautt.com` registered with IONOS
- AWS CLI installed and configured
- `jq` command-line tool installed

## Step 1: Deploy with SSL

Run the enhanced deployment script:

```bash
cd /mnt/c/Users/decry/Desktop/terrellflautt
npm run deploy:ssl
```

This script will:
1. **Request SSL certificate** for terrellflautt.com and www.terrellflautt.com
2. **Provide DNS validation records** you need to add to IONOS
3. **Wait for certificate validation**
4. **Create S3 bucket** and upload website files
5. **Create CloudFront distribution** with SSL certificate
6. **Resolve real IP addresses** for A records

## Step 2: SSL Certificate Validation

During deployment, you'll see output like this:

```
Domain: terrellflautt.com
Type: CNAME
Name: _abc123def456ghi789.terrellflautt.com
Value: _xyz789abc123def456.acm-validations.aws.

Domain: www.terrellflautt.com
Type: CNAME
Name: _def456ghi789abc123.www.terrellflautt.com
Value: _mno123pqr456stu789.acm-validations.aws.
```

**Add these CNAME records to IONOS immediately:**

### In IONOS DNS Management:
1. Go to IONOS account → Domains & SSL → terrellflautt.com → DNS
2. Click "Add Record"
3. Select "CNAME" type
4. Enter the exact Name from the validation (without the domain part)
5. Enter the exact Value from the validation
6. Set TTL to 300
7. Save
8. Repeat for the www validation record

## Step 3: Get CloudFront IP Addresses

After CloudFront deployment completes, you'll get real IP addresses. If not immediately available, use these commands:

### Method 1: Using dig
```bash
dig d1a2b3c4d5e6f7.cloudfront.net
```

### Method 2: Using nslookup
```bash
nslookup d1a2b3c4d5e6f7.cloudfront.net
```

### Method 3: Using online tools
- Visit: https://dnschecker.org/
- Enter your CloudFront domain
- Get IPv4 addresses

## Step 4: Configure IONOS DNS Records

### A Records for Root Domain (terrellflautt.com)

CloudFront typically provides 4 IP addresses. Add each as a separate A record:

**Record 1:**
- Type: A
- Name: @ (or leave blank)
- Value: [First IP from CloudFront]
- TTL: 300

**Record 2:**
- Type: A
- Name: @ (or leave blank)
- Value: [Second IP from CloudFront]
- TTL: 300

**Record 3:**
- Type: A
- Name: @ (or leave blank)
- Value: [Third IP from CloudFront]
- TTL: 300

**Record 4:**
- Type: A
- Name: @ (or leave blank)
- Value: [Fourth IP from CloudFront]
- TTL: 300

### CNAME Record for WWW Subdomain

**WWW Record:**
- Type: CNAME
- Name: www
- Value: [CloudFront domain from deployment output]
- TTL: 300

## Step 5: Example IONOS Configuration

Based on typical CloudFront IPs, your IONOS records should look like:

```
Type    Name    Value                           TTL
A       @       54.230.123.45                   300
A       @       54.230.234.56                   300
A       @       54.239.345.67                   300
A       @       99.84.456.78                    300
CNAME   www     d1a2b3c4d5e6f7.cloudfront.net   300
```

## Step 6: Verification Commands

After updating DNS records:

### Check DNS Propagation
```bash
# Check root domain
dig terrellflautt.com A

# Check www subdomain
dig www.terrellflautt.com CNAME

# Check from different DNS servers
dig @8.8.8.8 terrellflautt.com
dig @1.1.1.1 terrellflautt.com
```

### Test HTTPS
```bash
# Test HTTP response codes
curl -I https://terrellflautt.com
curl -I https://www.terrellflautt.com

# Test SSL certificate
openssl s_client -connect terrellflautt.com:443 -servername terrellflautt.com
```

### Online Tools
- **DNS Propagation**: https://whatsmydns.net/
- **SSL Test**: https://www.ssllabs.com/ssltest/
- **Website Test**: https://tools.pingdom.com/

## Step 7: Troubleshooting

### Common Issues

**1. CloudFront IPs not resolving:**
- Wait 15-20 minutes for CloudFront deployment
- Try different DNS servers (8.8.8.8, 1.1.1.1)
- Use online DNS lookup tools

**2. SSL Certificate validation stuck:**
- Verify CNAME records are exactly as provided
- Check for typos in validation records
- DNS propagation can take up to 48 hours

**3. Website not loading:**
- Verify all A records are added correctly
- Check CloudFront distribution status in AWS Console
- Ensure SSL certificate shows as "Issued"

**4. Mixed content errors:**
- All resources should load over HTTPS
- Check browser developer tools for HTTP requests

### Getting Help

**Commands to gather information:**
```bash
# Get current DNS records
dig terrellflautt.com ANY

# Check CloudFront distribution status
aws cloudfront get-distribution --id [DISTRIBUTION_ID] --query 'Distribution.Status'

# List SSL certificates
aws acm list-certificates --region us-east-1
```

## Step 8: Post-Deployment Checklist

- [ ] SSL certificate validated and issued
- [ ] CloudFront distribution status shows "Deployed"
- [ ] All A records added to IONOS with correct IPs
- [ ] CNAME record added for www subdomain
- [ ] DNS propagation confirmed (may take 24-48 hours)
- [ ] HTTPS works for both terrellflautt.com and www.terrellflautt.com
- [ ] Website loads correctly with all assets
- [ ] SSL certificate shows as valid in browser
- [ ] Redirects work (HTTP → HTTPS, www ↔ non-www)

## Expected Timeline

- **SSL Certificate Validation**: 5-30 minutes (after DNS records added)
- **CloudFront Deployment**: 15-20 minutes
- **DNS Propagation**: 1-48 hours (typically 1-4 hours)
- **Global Availability**: 24-48 hours for full worldwide propagation

## Security Considerations

- **TLS 1.2+**: CloudFront configured for modern TLS versions only
- **HTTPS Redirect**: All HTTP traffic automatically redirects to HTTPS
- **HSTS**: Consider adding HTTP Strict Transport Security headers
- **CSP**: Consider implementing Content Security Policy headers

## Performance Features

- **Global CDN**: Content delivered from edge locations worldwide
- **Gzip Compression**: Automatic compression for faster loading
- **Browser Caching**: Optimized cache headers for static assets
- **HTTP/2**: Modern protocol support for better performance

---

*For technical support or issues with this deployment, contact Terrell at tkflau@protonmail.com*