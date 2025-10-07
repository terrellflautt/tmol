# TerrellFlautt Voting API

Serverless API for voting, tracking, AI NPCs, and user interactions on terrellflautt.com.

## 🚀 Features

- **Voting System:** Vote tracking for projects with user identification
- **User Tracking:** Analytics and journey tracking
- **AI NPCs:** Quest for Glory inspired characters with personalities
- **Consciousness Sync:** User profile and data aggregation
- **Genie AI:** Interactive AI assistant
- **Forum:** Message boards with rate limiting
- **Stripe Integration:** Donations and contributions

## 📋 Prerequisites

- Node.js 18.x or higher
- AWS Account with credentials configured
- Serverless Framework CLI
- AWS CLI configured

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Install Serverless Framework globally (if not already installed)
npm install -g serverless
```

## 📦 Configuration

### Environment Variables

**For your own deployment**, store these in AWS Systems Manager Parameter Store:

```bash
# OpenAI API key for AI features
aws ssm put-parameter \
  --name "/YOUR-PROJECT-NAME/openai-api-key" \
  --value "sk-your-openai-key" \
  --type "SecureString"

# GitHub token for integrations (optional)
aws ssm put-parameter \
  --name "/YOUR-PROJECT-NAME/github-token" \
  --value "ghp_your-github-token" \
  --type "SecureString"

# Stripe secret key for payments
aws ssm put-parameter \
  --name "/YOUR-PROJECT-NAME/stripe-live-secret-key" \
  --value "sk_live_your-stripe-key" \
  --type "SecureString"

# Google OAuth credentials (if using authentication)
aws ssm put-parameter \
  --name "/YOUR-PROJECT-NAME/google-client-id" \
  --value "your-google-client-id" \
  --type "String"

aws ssm put-parameter \
  --name "/YOUR-PROJECT-NAME/google-client-secret" \
  --value "your-google-client-secret" \
  --type "SecureString"
```

**Then update `serverless.yml`** to use your parameter names:
```yaml
environment:
  STRIPE_SECRET_KEY: ${ssm:/YOUR-PROJECT-NAME/stripe-live-secret-key}
```

**Note:** The original deployment uses `/terrellflautt/*` parameters for production.

### DynamoDB Tables

Tables are automatically created on deployment:
- `terrellflautt-voting-api-prod-votes`
- `terrellflautt-voting-api-prod-feedback`
- `terrellflautt-voting-api-prod-user-journeys`
- `terrellflautt-voting-api-prod-tracking`
- `terrellflautt-voting-api-prod-tracking-events`
- `terrellflautt-voting-api-prod-hall-of-fame`
- `terrellflautt-voting-api-prod-donations`
- `terrellflautt-voting-api-prod-forum-messages`

## 🚢 Deployment

### Manual Deployment

```bash
# Deploy to production
npm run deploy

# View logs
npm run logs

# Remove deployment
npm run remove
```

### Automated Deployment with GitHub Actions

To enable automated deployments to **your own AWS account**, configure the following GitHub Secrets:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `AWS_ACCESS_KEY_ID` - Your AWS access key
   - `AWS_SECRET_ACCESS_KEY` - Your AWS secret key

The deployment workflow (`.github/workflows/deploy.yml`) will automatically:
- Trigger on push to `main` or `master` branch
- Install dependencies
- Deploy to your AWS account using Serverless Framework
- Report deployment status

**Note:** This deploys to YOUR AWS account using YOUR credentials. Make sure you want automated deployments enabled before adding these secrets.

## 🏗️ Infrastructure

### Monitoring

- **CloudWatch Alarms:** 7+ alarms monitoring API health, Lambda errors, and DynamoDB throttling
- **X-Ray Tracing:** Distributed tracing enabled on all Lambda functions
- **CloudWatch Dashboard:** Unified monitoring view at `TerrellFlautt-Infrastructure-Overview`

### Backups

- **Point-in-Time Recovery (PITR):** Enabled on all critical tables
- **Recovery Window:** 35 days
- **Restore Granularity:** Down to the second

### Tracing

AWS X-Ray is enabled for distributed tracing. View traces at:
```
AWS Console → X-Ray → Service Map
AWS Console → X-Ray → Traces
```

## 📡 API Endpoints

Base URL: `https://api.terrellflautt.com`

### Voting
- `POST /vote` - Cast a vote
- `GET /vote/{projectId}` - Get vote count

### Tracking
- `POST /tracking` - Track user event
- `GET /tracking/{userId}` - Get user tracking data

### AI Features
- `POST /genie` - Chat with Genie AI
- `POST /npc/chat` - Chat with AI NPCs
- `POST /consciousness/sync` - Sync user consciousness data
- `GET /consciousness/{userId}` - Get user consciousness

### User Journey
- `POST /journey` - Log journey event
- `GET /journey/{userId}` - Get user journey

### Forum
- `POST /forum/messages` - Post message
- `GET /forum/messages` - Get messages
- `GET /forum/rate-limit` - Check rate limit

### Contributions
- `POST /create-checkout-session` - Create Stripe checkout
- `POST /stripe-webhook` - Handle Stripe webhooks

## 🔧 Development

### Project Structure

```
voting-api/
├── vote.js                    # Voting handler
├── tracking.js                # User tracking
├── consciousness.js           # Consciousness sync
├── genie.js                   # Genie AI
├── npc-ai.js                  # NPC AI system
├── ai-character-prompts.js    # NPC personalities
├── user-profile.js            # User profiles
├── forum.js                   # Forum system
├── stripe-checkout.js         # Stripe integration
├── cors-headers.js            # Shared CORS config
├── xray-aws-sdk.js           # X-Ray instrumented AWS SDK
├── serverless.yml             # Serverless config
└── package.json               # Dependencies
```

### Key Features

**X-Ray Distributed Tracing:**
- Import `./xray-aws-sdk` instead of `aws-sdk` for automatic tracing
- Traces available in AWS X-Ray console

**CORS Configuration:**
- Origin: `https://terrellflautt.com`
- Credentials: Enabled
- Configured in `cors-headers.js`

**AI NPCs:**
- Dr. Cranium - Mad scientist
- Aziza - Mystical sphinx
- Time Keeper - Temporal entity
- Cthulhu - Eldritch horror

## 📊 Monitoring & Alerts

### CloudWatch Alarms

Access at: AWS Console → CloudWatch → Alarms

Active alarms:
- API Gateway high latency (>2000ms)
- Lambda high error rate (>5 errors/5min)
- DynamoDB throttled requests
- Lambda concurrent execution limit
- Lambda duration approaching timeout

### SNS Topic for Alerts

Topic ARN: `arn:aws:sns:us-east-1:692859945539:critical-alerts`

To receive email alerts:
```bash
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:692859945539:critical-alerts \
  --protocol email \
  --notification-endpoint your-email@example.com
```

## 🛡️ Security

- CORS restricted to `https://terrellflautt.com`
- Rate limiting on forum endpoints
- API Gateway throttling configured
- Stripe webhook signature verification
- X-Ray tracing for audit trails

## 💰 Cost Optimization

Current monthly costs (~$10-40):
- Lambda invocations: ~$5-20
- DynamoDB: ~$5-10
- API Gateway: ~$3-5
- CloudWatch: ~$4
- X-Ray: <$1

## 🔄 Backup & Recovery

### Point-in-Time Recovery

All critical tables have PITR enabled with 35-day retention.

To restore a table:
```bash
aws dynamodb restore-table-to-point-in-time \
  --source-table-name terrellflautt-voting-api-prod-votes \
  --target-table-name terrellflautt-voting-api-prod-votes-restored \
  --restore-date-time 2025-10-07T12:00:00Z
```

## 📚 Additional Documentation

- [Infrastructure Improvements Report](../../INFRASTRUCTURE-IMPROVEMENTS-COMPLETED.md)
- [Fixes Completed](../../FIXES-COMPLETED-TODAY.md)
- [Comprehensive Status Report](../../COMPREHENSIVE-FINAL-STATUS-REPORT.md)

## 🤝 Contributing

This is a private project. For issues or questions, contact the maintainer.

## 📄 License

Private - All Rights Reserved

---

**Last Updated:** October 7, 2025
**API Version:** 1.0.0
**Status:** Production ✅
