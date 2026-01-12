# 🚀 Quick Start Guide - Fix Timeout Error

## The Problem
You're seeing: **"Request timed out. Make sure the backend server is running and accessible."**

This means the **backend server is not running**.

## ✅ Solution (2 Steps)

### Step 1: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

**Keep this terminal open!** You should see:
```
🚀 ProofScore API server running on http://localhost:3001
📊 Health check: http://localhost:3001/health
```

### Step 2: Start Frontend (if not already running)

Open another terminal and run:
```bash
cd frontend
npm run dev
```

## ✅ Verify It's Working

### Test 1: Backend Health
```bash
curl http://localhost:3001/health
```
Should return: `{"status":"ok","service":"proofscore-api",...}`

### Test 2: Frontend Connection
1. Visit http://localhost:3000/dashboard
2. Enter wallet address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
3. Click "Check Reputation"
4. Should get score (not timeout)

## 🔧 If Backend Won't Start

### Check 1: Dependencies Installed?
```bash
cd backend
npm install
```

### Check 2: Port Available?
```bash
# Check if port 3001 is in use
lsof -i :3001

# If something is using it, kill it:
lsof -ti:3001 | xargs kill -9
```

### Check 3: Setup Complete?
```bash
cd backend
npm run check
```

## 📋 Two Terminal Setup

**Terminal 1 (Backend):**
```bash
cd /home/zion/Documents/Projects/ProofScore/backend
npm run dev
# Keep this running!
```

**Terminal 2 (Frontend):**
```bash
cd /home/zion/Documents/Projects/ProofScore/frontend
npm run dev
# Keep this running!
```

## 🎯 Quick Commands

```bash
# Start backend
cd backend && npm run dev

# Test backend (in another terminal)
curl http://localhost:3001/health

# Start frontend (in another terminal)
cd frontend && npm run dev
```

## ⚠️ Common Mistakes

1. **Backend not running** → Start it first!
2. **Wrong directory** → Make sure you're in `backend/` folder
3. **Port conflict** → Kill process on port 3001 or change PORT in .env
4. **Dependencies missing** → Run `npm install` in backend folder

## ✅ Success Indicators

When everything is working:
- ✅ Backend terminal shows: "🚀 ProofScore API server running..."
- ✅ Frontend loads without errors
- ✅ Wallet address search works
- ✅ Score displays correctly

## 🆘 Still Having Issues?

1. Check backend logs for errors
2. Verify port 3001 is accessible: `curl http://localhost:3001/health`
3. Check frontend console for specific error messages
4. Make sure both servers are running simultaneously






