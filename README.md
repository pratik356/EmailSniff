<div align="center">

# 📧 EmailSniff

### Production-Ready Disposable Email Detection API
#### Built for Speed, Deployed Serverless

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

[🌐 Live Demo](https://email-sniff.vercel.app) • [📚 API Docs](#-api-reference) • [🚀 Get Started](#-quick-start) • [💻 GitHub](https://github.com/pratik356/EmailSniff)

</div>

---

## ✨ Features

<div align="center">

| Feature | Details |
|---------|---------|
| ⚡ **Lightning Fast** | O(1) lookup performance, <1ms response time |
| 🌐 **7900+ Domains** | Comprehensive disposable email database |
| 🔄 **Auto-Updated** | Daily updates via GitHub Actions |
| 🚀 **Serverless Ready** | Deploy anywhere—Vercel, AWS, Azure, Netlify |
| 📦 **Zero Dependencies** | Just Next.js and TypeScript |
| 🔌 **Multiple Endpoints** | Single check, batch processing, metadata |
| 📊 **Risk Scoring** | Intelligent email validation |
| 🛡️ **Production Secure** | Input validation & error handling |

</div>

---

## 🚀 Quick Start

### 📥 Installation

```bash
# Clone repository
git clone https://github.com/pratik356/EmailSniff.git
cd EmailSniff

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### 💻 Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` and start testing emails instantly! 🎉

### 🌍 Deployment

#### **Vercel (Recommended - 1 Click Deploy)**

```bash
npm install -g vercel
vercel
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pratik356/EmailSniff)

#### **Other Platforms**

Works seamlessly with:
- 🟠 AWS Lambda
- 🔵 Google Cloud Functions  
- 💜 Azure Functions
- 🎭 Netlify Functions
- 📦 Any Node.js runtime

---

## 📡 API Reference

### 1️⃣ Check Single Email

**Request:**
```http
GET /api/check?email=user@example.com
```

**Response:**
```json
{
  "email": "user@mailinator.com",
  "domain": "mailinator.com",
  "disposable": true,
  "confidence": 0.99,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2️⃣ Batch Check Multiple Emails

**Request:**
```http
POST /api/batch-check
Content-Type: application/json

{
  "emails": [
    "user@gmail.com",
    "test@mailinator.com",
    "admin@company.com"
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "email": "user@gmail.com",
      "domain": "gmail.com",
      "disposable": false,
      "risk": "low",
      "valid": true
    },
    {
      "email": "test@mailinator.com",
      "domain": "mailinator.com",
      "disposable": true,
      "risk": "high",
      "valid": true
    },
    {
      "email": "admin@company.com",
      "domain": "company.com",
      "disposable": false,
      "risk": "low",
      "valid": true
    }
  ],
  "summary": {
    "total": 3,
    "valid": 3,
    "disposable_count": 1,
    "legitimate_count": 2
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 3️⃣ Get API Metadata

**Request:**
```http
GET /api/metadata
```

**Response:**
```json
{
  "service": "EmailSniff - Disposable Email Detection",
  "version": "1.0.0",
  "status": "operational",
  "domains_count": 7900,
  "source_repo": "https://github.com/disposable-email-domains/disposable-email-domains",
  "last_updated": "2024-01-15T02:00:00.000Z",
  "performance": {
    "avg_response_time_ms": 0.8,
    "cold_start_ms": 150
  }
}
```

---

## 💡 Usage Examples

### JavaScript / TypeScript

```typescript
// Single email check
const checkEmail = async (email: string) => {
  const response = await fetch(`/api/check?email=${email}`);
  const result = await response.json();
  
  if (result.disposable) {
    console.log(`⚠️  ${email} is disposable`);
  } else {
    console.log(`✅ ${email} is legitimate`);
  }
};

// Batch processing
const batchCheck = async (emails: string[]) => {
  const response = await fetch('/api/batch-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emails })
  });
  const result = await response.json();
  return result;
};

checkEmail('test@mailinator.com');
```

### cURL

```bash
# Single email check
curl "https://email-sniff.vercel.app/api/check?email=test@mailinator.com"

# Batch check
curl -X POST "https://email-sniff.vercel.app/api/batch-check" \
  -H "Content-Type: application/json" \
  -d '{
    "emails": ["user@gmail.com", "test@mailinator.com", "admin@company.com"]
  }'

# Get metadata
curl "https://email-sniff.vercel.app/api/metadata"
```

### Python

```python
import requests

# Single check
response = requests.get(
    'https://email-sniff.vercel.app/api/check',
    params={'email': 'user@example.com'}
)
result = response.json()
print(f"Disposable: {result['disposable']}")

# Batch check
batch_response = requests.post(
    'https://email-sniff.vercel.app/api/batch-check',
    json={'emails': ['user@gmail.com', 'test@mailinator.com']}
)
batch_result = batch_response.json()
print(f"Found {batch_result['summary']['disposable_count']} disposable emails")
```

### Node.js (Fetch)

```javascript
const emails = ['user@gmail.com', 'test@tempmail.com'];

const response = await fetch('https://email-sniff.vercel.app/api/batch-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ emails })
});

const data = await response.json();
data.results.forEach(result => {
  const status = result.disposable ? '🚫' : '✅';
  console.log(`${status} ${result.email}`);
});
```

---

## 🔄 Automatic Updates

EmailSniff automatically keeps its disposable domain list fresh with **daily GitHub Actions**:

```
🔔 Trigger (2 AM UTC daily)
    ↓
📥 Fetch latest domains from official source
    ↓
🔍 Compare & detect changes
    ↓
💾 Commit new data (if changed)
    ↓
🚀 Auto-deploy to Vercel
```

### Setup Auto-Updates

1. **Add GitHub Secrets** in repository settings:
   - `VERCEL_TOKEN` - Get from [Vercel Dashboard](https://vercel.com/account/tokens)
   - `VERCEL_TEAM_ID` - Optional, for team accounts

2. **Workflow starts automatically** via `.github/workflows/update-domains.yml`

3. **Manual trigger:**
   ```bash
   gh workflow run update-domains.yml
   ```

---

## 📊 Performance Metrics

```
┌─────────────────────────────────────┐
│   Operation      │   Response Time   │
├──────────────────┼───────────────────┤
│ Single Check     │   < 1ms          │
│ Batch (100)      │   < 5ms          │
│ Batch (1000)     │   < 50ms         │
│ Cold Start       │   100-200ms      │
│ Database Lookup  │   O(1)           │
└─────────────────────────────────────┘
```

---

## 📁 Project Structure

```
EmailSniff/
├── 📂 app/
│   ├── 📂 api/
│   │   ├── check/route.ts              # Single email endpoint
│   │   ├── batch-check/route.ts        # Batch processing
│   │   └── metadata/route.ts           # Service info
│   ├── 📂 components/                  # React components
│   ├── page.tsx                        # Landing page + demo
│   ├── layout.tsx                      # Root layout
│   └── globals.css                     # Styling
├── 📂 data/
│   └── disposable_domains.json         # 7900+ domains (auto-updated)
├── 📂 scripts/
│   ├── update-domains.mjs              # Domain fetcher
│   └── generate-sitemap.mjs            # SEO sitemap
├── 📂 .github/workflows/
│   └── update-domains.yml              # GitHub Actions
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.mjs
└── 📄 README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + TypeScript |
| **Framework** | Next.js 16 (App Router) |
| **Styling** | TailwindCSS 4 |
| **UI Components** | shadcn/ui, Base UI |
| **Deployment** | Vercel Edge Network |
| **Automation** | GitHub Actions |
| **Icons** | Lucide React |

---

## 🔐 HTTP Status Codes

```
200 ✅ Success - Email checked successfully
400 ⚠️  Bad Request - Invalid email or missing parameters  
422 ⚠️  Validation Error - Email format incorrect
429 ⏱️  Rate Limited - Too many requests
500 ❌ Server Error - Internal issue
```

---

## 🔒 Security & Compliance

- ✅ **Input Validation** - All endpoints validate email format
- ✅ **No Data Storage** - Zero logging of checked emails
- ✅ **CORS Protected** - Configurable cross-origin access
- ✅ **Rate Limiting** - Built-in protection via Vercel
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **HTTPS Only** - All connections encrypted
- ✅ **TypeScript** - Full type safety

---

## 📚 Environment Variables

**Good news:** EmailSniff works out of the box! ✨

Optional configuration (`.env.local`):

```env
# Optional: For custom deployment
NEXT_PUBLIC_API_URL=https://your-custom-domain.com
```

---

## 🌟 Data Source

Domain list sourced from official [disposable-email-domains](https://github.com/disposable-email-domains/disposable-email-domains) repository - the most comprehensive, community-maintained database.

---

## 📝 Available Scripts

```bash
npm run dev          # Start development server on :3000
npm run build        # Production build
npm start            # Run production server
npm run lint         # Check code quality
npm run update-domains  # Manually update domain list
npm run sitemap      # Generate SEO sitemap
```

---

## 🎯 Use Cases

- 🛒 **E-commerce** - Prevent fake signups during registration
- 📧 **Email Marketing** - Clean contact lists before campaigns
- 🏢 **Enterprise** - Validate corporate email domains
- 🔐 **Authentication** - Block disposable emails at signup
- 📊 **Analytics** - Track email validation patterns
- ✅ **Quality Assurance** - Test systems with known disposables

---

## 🤝 Contributing

We love contributions! Please feel free to:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing`)
3. **Commit** your changes (`git commit -m '✨ Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing`)
5. **Open** a Pull Request

---

## 📞 Support & Issues

- 🐛 **Found a bug?** [Open an issue](https://github.com/pratik356/EmailSniff/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/pratik356/EmailSniff/discussions)
- 📖 **Need help?** Check the [API docs](#-api-reference)

---

## 📄 License

MIT License © 2024 - See [LICENSE](LICENSE) file for details

---

<div align="center">

### 🚀 Ready to Ship Disposable Email Detection?

**[Deploy Now](https://vercel.com/new/clone?repository-url=https://github.com/pratik356/EmailSniff)** • **[View Live Demo](https://email-sniff.vercel.app)** • **[Star on GitHub](https://github.com/pratik356/EmailSniff)**

---

**Made with ❤️ by [Pratik](https://github.com/pratik356)**

*Validating emails, one request at a time.*

</div>
