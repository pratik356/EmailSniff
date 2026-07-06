# ⚡ Quick Start - Disposable Email Detection API

Get up and running in 60 seconds!

## 1️⃣ Install (30 seconds)
```bash
cd disposable-email-api
pnpm install
```

## 2️⃣ Run (10 seconds)
```bash
pnpm dev
```

## 3️⃣ Test (20 seconds)

### Option A: Browser
Open `http://localhost:3000` → Enter email → Click "Check Email"

### Option B: Command Line
```bash
# Test disposable email
curl "http://localhost:3000/api/check?email=test@mailinator.com"

# Test valid email
curl "http://localhost:3000/api/check?email=user@gmail.com"

# Test batch check
curl -X POST "http://localhost:3000/api/batch-check" \
  -H "Content-Type: application/json" \
  -d '{"emails": ["user@gmail.com", "test@mailinator.com"]}'
```

## 📚 API Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/check?email=...` | GET | Check single email |
| `/api/batch-check` | POST | Check multiple emails |
| `/api/metadata` | GET | API information |
| `/docs` | - | Full documentation |

## ✅ You're Done!

Your API is now running with:
- ✨ 7,900+ disposable domains
- ⚡ <1ms response time
- 🚀 Ready to deploy

### What's Next?

- 📖 [Full Setup Guide](SETUP.md) - Detailed testing & development
- 🚢 [Deploy Guide](DEPLOYMENT.md) - Deploy to production
- 📚 [Full Docs](PROJECT_OVERVIEW.md) - Complete project overview

---

**That's it! You now have a production-ready disposable email detection API.** 🎉
