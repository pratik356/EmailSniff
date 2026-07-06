# Setup Guide

Complete setup and testing guide for the Disposable Email Detection API.

## Quick Start

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 2. Start Development Server

```bash
pnpm dev
# Server will run on http://localhost:3000
```

### 3. Test the API

Once the server is running, you can test the API endpoints:

#### Single Email Check
```bash
curl "http://localhost:3000/api/check?email=test@mailinator.com"
```

Expected response:
```json
{
  "email": "test@mailinator.com",
  "domain": "mailinator.com",
  "disposable": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Valid Email Check
```bash
curl "http://localhost:3000/api/check?email=user@gmail.com"
```

Expected response:
```json
{
  "email": "user@gmail.com",
  "domain": "gmail.com",
  "disposable": false,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Batch Check Multiple Emails
```bash
curl -X POST "http://localhost:3000/api/batch-check" \
  -H "Content-Type: application/json" \
  -d '{
    "emails": ["user@gmail.com", "test@mailinator.com", "admin@example.com"]
  }'
```

Expected response:
```json
{
  "results": [
    {
      "email": "user@gmail.com",
      "valid": true,
      "domain": "gmail.com",
      "disposable": false,
      "risk": "low"
    },
    {
      "email": "test@mailinator.com",
      "valid": true,
      "domain": "mailinator.com",
      "disposable": true,
      "risk": "high"
    },
    {
      "email": "admin@example.com",
      "valid": true,
      "domain": "example.com",
      "disposable": false,
      "risk": "low"
    }
  ],
  "total": 3,
  "disposable_count": 1,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Get API Metadata
```bash
curl "http://localhost:3000/api/metadata"
```

Expected response:
```json
{
  "service": "Disposable Email Detection API",
  "version": "1.0.0",
  "domains_count": 7900,
  "source_repo": "https://github.com/disposable-email-domains/disposable-email-domains",
  "last_updated": "2024-01-15T10:30:00.000Z",
  "endpoints": {
    "single": {
      "method": "GET",
      "path": "/api/check?email=test@example.com",
      "description": "Check single email"
    },
    "batch": {
      "method": "POST",
      "path": "/api/batch-check",
      "description": "Check multiple emails (max 1000)"
    }
  }
}
```

## Testing with Web UI

1. Open browser to `http://localhost:3000`
2. You'll see the landing page with an interactive demo
3. Enter an email address and click "Check Email"
4. View the result in the demo section

## Available npm Scripts

```bash
# Development
pnpm dev                  # Start development server
pnpm build               # Build for production
pnpm start               # Start production server

# Utilities
pnpm update-domains      # Manually update disposable domains list
pnpm lint                # Run linter
```

## Project Structure

```
disposable-email-api/
├── app/
│   ├── api/
│   │   ├── check/
│   │   │   └── route.ts              # Single email check endpoint
│   │   ├── batch-check/
│   │   │   └── route.ts              # Batch processing endpoint
│   │   └── metadata/
│   │       └── route.ts              # API metadata endpoint
│   ├── docs/
│   │   └── page.tsx                  # API documentation page
│   ├── page.tsx                      # Landing page with demo
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── data/
│   └── disposable_domains.json       # List of disposable domains
├── scripts/
│   └── update-domains.mjs            # Script to update domains list
├── .github/
│   └── workflows/
│       └── update-domains.yml        # GitHub Actions automation
├── public/                           # Static assets
├── node_modules/                     # Dependencies
├── package.json                      # Project configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
└── README.md                         # Project documentation
```

## Development Workflow

### 1. Making API Changes

If you modify any API endpoint in `app/api/`:

```bash
# The dev server automatically reloads
# No restart needed
```

### 2. Adding New Endpoints

1. Create new directory: `app/api/new-endpoint/`
2. Create `route.ts` file
3. Implement the handler
4. Dev server automatically detects the route

Example:
```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}
```

### 3. Updating the Disposable Domains List

Manually update the list:
```bash
pnpm update-domains
```

This will:
- Fetch the latest list from GitHub
- Compare with current list
- Only update if there are changes
- Show statistics

## Testing Best Practices

### Test Cases to Run

```bash
#!/bin/bash

echo "Testing API endpoints..."

# Test 1: Single valid email
echo "Test 1: Valid email (gmail.com)"
curl "http://localhost:3000/api/check?email=user@gmail.com"

# Test 2: Single disposable email
echo "Test 2: Disposable email (mailinator.com)"
curl "http://localhost:3000/api/check?email=test@mailinator.com"

# Test 3: Another disposable
echo "Test 3: Another disposable (10minutemail.com)"
curl "http://localhost:3000/api/check?email=temp@10minutemail.com"

# Test 4: Batch check
echo "Test 4: Batch check"
curl -X POST "http://localhost:3000/api/batch-check" \
  -H "Content-Type: application/json" \
  -d '{"emails": ["user@gmail.com", "test@mailinator.com"]}'

# Test 5: Metadata
echo "Test 5: Metadata"
curl "http://localhost:3000/api/metadata"

# Test 6: Invalid email format
echo "Test 6: Invalid email format"
curl "http://localhost:3000/api/check?email=invalid-email"

# Test 7: Missing parameter
echo "Test 7: Missing parameter"
curl "http://localhost:3000/api/check"

echo "All tests completed!"
```

Save this as `test-api.sh`, make it executable, and run:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install ab (comes with Apache)
# Ubuntu/Debian: sudo apt-get install apache2-utils

# Test single endpoint
ab -n 1000 -c 10 "http://localhost:3000/api/metadata"

# Test with query parameter
ab -n 1000 -c 10 "http://localhost:3000/api/check?email=test@gmail.com"
```

### Load Testing with wrk

```bash
# Install wrk: https://github.com/wg/wrk

wrk -t12 -c400 -d30s "http://localhost:3000/api/metadata"
```

## Troubleshooting

### Issue: "Cannot find module 'disposable_domains.json'"

**Solution**:
```bash
# Ensure the data directory and file exist
ls -la data/disposable_domains.json

# If missing, regenerate it
pnpm update-domains
```

### Issue: Port 3000 is already in use

**Solution**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Issue: Module not found errors

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
pnpm install
```

### Issue: TypeScript errors

**Solution**:
```bash
# Regenerate TypeScript types
pnpm exec tsc --noEmit

# Check for specific file errors
pnpm exec tsc app/api/check/route.ts --noEmit
```

## Environment Variables

Currently, no environment variables are required. The API works out of the box!

However, you can optionally configure:

### Optional Variables

Create `.env.local`:
```bash
# Optional: Override domains file path
DOMAINS_FILE_PATH=./data/disposable_domains.json

# Optional: Enable debug logging
DEBUG=disposable-email-api:*
```

## Building for Production

### Build the Project

```bash
pnpm build
```

This creates an optimized production build in `.next/`

### Run Production Build Locally

```bash
pnpm start
```

The production server will start on port 3000.

### Verify Production Build

```bash
# Test endpoints with production build
curl "http://localhost:3000/api/check?email=test@mailinator.com"
```

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deployment to Vercel:
```bash
npm install -g vercel
vercel
```

## Next Steps

1. ✅ Complete setup with `pnpm install`
2. ✅ Start dev server with `pnpm dev`
3. ✅ Test endpoints using curl or the web UI
4. ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
5. ✅ Read [README.md](README.md) for API documentation
6. ✅ Read [docs/](app/docs/) page for full API reference

## Support

- 📚 See [README.md](README.md) for API documentation
- 📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- 📋 See [app/docs/](app/docs/page.tsx) for interactive documentation
- 🐛 File issues on GitHub

---

Enjoy building with the Disposable Email Detection API!
