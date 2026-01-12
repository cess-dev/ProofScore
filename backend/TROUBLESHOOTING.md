# Troubleshooting Guide

## Network Error When Checking Reputation

If you're getting a network error, check the following:

### 1. Backend Server is Running

```bash
cd backend
npm run dev
```

You should see:
```
🚀 ProofScore API server running on http://localhost:3001
📊 Health check: http://localhost:3001/health
```

### 2. Test Backend Health Endpoint

```bash
curl http://localhost:3001/health
```

Should return:
```json
{"status":"ok","service":"proofscore-api","timestamp":"..."}
```

### 3. Check Frontend API URL

Make sure `frontend/.env.local` has:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Database Setup (Optional for Development)

The backend works without a database in development mode, but for full features:

```bash
# Install dependencies
cd backend
npm install

# Setup database (if using PostgreSQL)
# Create .env file with DATABASE_URL
# Then run:
npx prisma migrate dev
npx prisma generate
```

### 5. Common Issues

#### CORS Error
- Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default is `http://localhost:3000`

#### Database Connection Error
- The backend will continue without database in dev mode
- Check `DATABASE_URL` in `.env` if you want persistence

#### KRNL API Error
- Backend falls back to basic scoring in development
- Set `KRNL_API_KEY` in `.env` for production

### 6. Test API Directly

```bash
# Test score endpoint
curl "http://localhost:3001/api/scores/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Should return JSON with score data
```

### 7. Check Browser Console

Open browser DevTools → Network tab:
- Look for failed requests
- Check request URL matches backend
- Verify CORS headers are present

### 8. Port Conflicts

If port 3001 is in use:
```bash
# Change PORT in backend/.env
PORT=3002

# Update frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3002
```
