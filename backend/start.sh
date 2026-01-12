#!/bin/bash

# ProofScore Backend Startup Script
# This script checks dependencies and starts the backend server

set -e

echo "🚀 ProofScore Backend Startup Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the backend directory."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Check if Prisma client is generated
if [ ! -d "node_modules/.prisma/client" ]; then
    echo "🔧 Generating Prisma client..."
    npx prisma generate
    echo "✅ Prisma client generated"
    echo ""
else
    echo "✅ Prisma client ready"
    echo ""
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "   Creating .env with default values..."
    cat > .env << EOF
# Server Configuration
PORT=3001
NODE_ENV=development

# Database (optional for development)
DATABASE_URL=postgresql://user:password@localhost:5432/proofscore

# KRNL Middleware (optional for development)
KRNL_API_URL=https://api.krnl.io
KRNL_API_KEY=demo-key

# Blockchain RPC URLs (optional)
# MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_key
# ARBITRUM_RPC_URL=https://arbitrum-mainnet.infura.io/v3/your_key

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Created .env file with defaults"
    echo ""
else
    echo "✅ .env file exists"
    echo ""
fi

# Check if port is available
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Warning: Port 3001 is already in use"
    echo "   You may need to stop the existing process or change PORT in .env"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Port 3001 is available"
    echo ""
fi

echo "🎯 Starting backend server..."
echo "   Server will be available at: http://localhost:3001"
echo "   Health check: http://localhost:3001/health"
echo "   API docs: http://localhost:3001/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
npm run dev






