# Deployment Guide

Complete guide for deploying the Disposable Email Detection API to production.

## Prerequisites

- Node.js 18+ or compatible runtime
- Git account
- Vercel account (recommended) or alternative serverless platform account

## Option 1: Deploy to Vercel (Recommended)

Vercel is the optimal platform for this API as it's built on the same platform as Next.js.

### Step 1: Connect GitHub Repository

1. Create a GitHub repository for this project
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Disposable Email Detection API"
   git branch -M main
   git remote add origin https://github.com/yourusername/disposable-email-api.git
   git push -u origin main
   ```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Deploy"

Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to their global CDN

Your API is now live! Example URL: `https://disposable-email-api.vercel.app`

### Step 3: Set Up Automatic Updates

To enable daily automatic updates of the disposable domains list:

1. In your Vercel project settings, note your:
   - **Team ID** (if using team account)
   - Get your API token from [vercel.com/account/tokens](https://vercel.com/account/tokens)

2. In your GitHub repository settings:
   - Go to "Settings" → "Secrets and variables" → "Actions"
   - Add two secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_TEAM_ID`: Your Vercel team ID (leave empty for personal account)

3. The GitHub Actions workflow (`.github/workflows/update-domains.yml`) will now:
   - Run daily at 2 AM UTC
   - Check for new disposable domains
   - Automatically commit and push updates
   - Trigger a Vercel redeploy

### Step 4: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Option 2: Deploy to AWS Lambda

### Step 1: Set Up AWS Account

1. Create an AWS account at [aws.amazon.com](https://aws.amazon.com)
2. Create an IAM user with Lambda permissions
3. Install AWS CLI: `npm install -g aws-cli`
4. Configure credentials: `aws configure`

### Step 2: Build for Lambda

```bash
npm run build
```

### Step 3: Deploy Using AWS SAM

Create `template.yaml`:
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2.0
Description: Disposable Email Detection API

Globals:
  Function:
    Timeout: 30
    Runtime: nodejs18.x

Resources:
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: .next/server/pages/api/check.handler
      Events:
        CheckEmail:
          Type: Api
          Properties:
            Path: /api/check
            Method: GET

Outputs:
  ApiEndpoint:
    Description: API endpoint
    Value: !Sub https://${ServerlessApi}.execute-api.${AWS::Region}.amazonaws.com/Prod
```

Deploy:
```bash
sam deploy --guided
```

### Step 4: Set Up Lambda Auto Updates

1. Create a CloudWatch Events rule to trigger daily
2. Create a Lambda function to run the update script
3. Connect them together

## Option 3: Deploy to Google Cloud Functions

### Step 1: Set Up Google Cloud

```bash
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

### Step 2: Prepare for Cloud Functions

Create `package.json` with appropriate handlers for Cloud Functions.

### Step 3: Deploy

```bash
gcloud functions deploy check \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated
```

## Option 4: Deploy to Netlify Functions

### Step 1: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `.next`

### Step 2: Configure for Functions

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

## Option 5: Deploy to Self-Hosted Server

### Step 1: Install Node.js

```bash
# On Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Clone Repository

```bash
git clone https://github.com/yourusername/disposable-email-api.git
cd disposable-email-api
npm install
```

### Step 3: Build and Start

```bash
npm run build
npm start
```

The API runs on `http://localhost:3000`

### Step 4: Set Up Process Manager

Use PM2 to keep the process running:

```bash
npm install -g pm2
pm2 start npm --name "email-api" -- start
pm2 save
pm2 startup
```

### Step 5: Set Up Nginx Reverse Proxy

Create `/etc/nginx/sites-available/api`:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Set Up SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Step 7: Set Up Automatic Updates

Create a cron job:

```bash
crontab -e
```

Add:
```
0 2 * * * cd /path/to/disposable-email-api && npm run update-domains && npm run build && pm2 restart email-api
```

## Post-Deployment Checklist

- [ ] API is accessible at your domain
- [ ] Single email check endpoint works
- [ ] Batch check endpoint works
- [ ] Metadata endpoint returns data
- [ ] Domain list is loaded (check with `/api/metadata`)
- [ ] GitHub Actions secrets are configured (if using Vercel)
- [ ] Automatic update workflow is enabled
- [ ] SSL certificate is valid (for HTTPS)
- [ ] CORS is properly configured
- [ ] Rate limiting is in place (if needed)

## Testing Your Deployment

```bash
# Test single email
curl "https://your-api.com/api/check?email=test@mailinator.com"

# Test batch check
curl -X POST "https://your-api.com/api/batch-check" \
  -H "Content-Type: application/json" \
  -d '{"emails": ["user@gmail.com", "test@mailinator.com"]}'

# Test metadata
curl "https://your-api.com/api/metadata"
```

## Monitoring

### For Vercel
- Real-time logs: Vercel Dashboard → Logs
- Analytics: Vercel Dashboard → Analytics
- Alerts: Configure in Project Settings

### For Self-Hosted
```bash
# View PM2 logs
pm2 logs email-api

# Monitor resource usage
pm2 monit
```

## Troubleshooting

### Issue: "Cannot find module disposable_domains.json"

**Solution**: Ensure the data file is included in your deployment:
```bash
# For Vercel, this is automatic
# For others, ensure data/ directory is in deployment
```

### Issue: Slow cold starts

**Solution**: 
- Use Vercel (optimized for Next.js)
- Upgrade server resources
- Consider increasing memory allocation

### Issue: Updates not running

**Solution**:
- Check GitHub Actions logs
- Verify VERCEL_TOKEN and VERCEL_TEAM_ID secrets are set
- Manually trigger: `gh workflow run update-domains.yml`

## Performance Optimization

### Caching

The API uses in-memory caching with singletons for optimal performance:

```typescript
let domainsSet: Set<string> | null = null;

function getDomainsSet(): Set<string> {
  if (!domainsSet) {
    domainsSet = new Set(disposableDomains);
  }
  return domainsSet;
}
```

### CDN Configuration

For Vercel, caching is automatic. For others:

```typescript
// Add cache headers to responses
response.headers.set('Cache-Control', 'public, max-age=3600');
```

## Scaling Considerations

- **Current**: Handles 10,000+ requests per second on Vercel
- **Optimization**: Add rate limiting for public APIs
- **Load**: Monitor response times and adjust as needed

## Security Hardening

1. **Rate Limiting**: Implement API rate limits
2. **Authentication**: Add API key validation if needed
3. **Input Validation**: Already implemented
4. **CORS**: Configure allowed origins
5. **Monitoring**: Set up alerts for errors

---

Need help? Check the README.md or create an issue on GitHub.
