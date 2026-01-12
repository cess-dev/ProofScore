# Backend Quick Start Guide

## 🚨 Common Issues & Fixes

### Issue 1: Backend Won't Start

**Symptoms:**
- "Cannot find module" errors
- "Prisma Client not generated" errors
- Port already in use errors

**Solution:**
Run the startup script which handles everything automatically:

```bash
cd backend
./start.sh
```

Or manually:

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Issue 2: Missing Dependencies

**Symptoms:**
- `Error: Cannot find module '@prisma/client'`
- `Error: Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### Issue 3: Prisma Client Not Generated

**Symptoms:**
- `Error: @prisma/client did not initialize yet`

**Solution:**
```bash
cd backend
npx prisma generate
```

### Issue 4: Port Already in Use

**Symptoms:**
- `Error: listen EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Find and kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Or change the port in .env
echo "PORT=3002" >> backend/.env
```

### Issue 5: Database Connection Error

**Symptoms:**
- Database connection errors in logs
- But server still starts (this is OK in dev mode)

**Solution:**
The backend works without a database in development mode. If you want to use a database:

1. Install PostgreSQL
2. Create a database:
   ```sql
   CREATE DATABASE proofscore;
   ```
3. Update `.env`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/proofscore
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

## ✅ Verification Steps

After starting the backend, verify it's working:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Should return:
# {"status":"ok","service":"proofscore-api","timestamp":"..."}

# Test score endpoint
curl "http://localhost:3001/api/scores/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Should return score data
```

## 📋 Pre-flight Checklist

Before starting the backend, ensure:

- [ ] Node.js 18+ is installed (`node -v`)
- [ ] npm is installed (`npm -v`)
- [ ] You're in the `backend` directory
- [ ] Dependencies are installed (`npm install`)
- [ ] Prisma client is generated (`npx prisma generate`)
- [ ] Port 3001 is available (or change PORT in .env)

## 🎯 Quick Start (One Command)

```bash
cd backend && ./start.sh
```

This script will:
1. ✅ Check Node.js version
2. ✅ Install dependencies if needed
3. ✅ Generate Prisma client if needed
4. ✅ Create .env file if missing
5. ✅ Check port availability
6. ✅ Start the server

## 🔧 Manual Start

If you prefer to do it manually:

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Create .env file (if missing)
# Copy from .env.example or use defaults

# 4. Start server
npm run dev
```

## 📝 Environment Variables

The backend works with minimal configuration. Create `backend/.env`:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Optional (for full features):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/proofscore
KRNL_API_KEY=your_krnl_key
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_key
```

## 🐛 Still Having Issues?

1. Check backend logs for specific error messages
2. Verify Node.js version: `node -v` (should be 18+)
3. Try clearing node_modules and reinstalling:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. Check if port 3001 is in use:
   ```bash
   lsof -i :3001
   ```






