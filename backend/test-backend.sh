#!/bin/bash

# Backend Test Script
# Tests backend startup and API endpoints

set -e

echo "🧪 Testing ProofScore Backend"
echo "=============================="
echo ""

cd "$(dirname "$0")"

# Check if server is already running
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 3001 is already in use"
    read -p "Kill existing process and continue? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:3001 | xargs kill -9 2>/dev/null || true
        sleep 2
    else
        exit 1
    fi
fi

# Start server in background
echo "🚀 Starting backend server..."
npm run dev > /tmp/proofscore-backend.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
for i in {1..30}; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Server started successfully (PID: $SERVER_PID)"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Server failed to start after 30 seconds"
        kill $SERVER_PID 2>/dev/null || true
        echo "Last 20 lines of log:"
        tail -20 /tmp/proofscore-backend.log
        exit 1
    fi
    sleep 1
done

echo ""
echo "📋 Running Tests"
echo "================"
echo ""

# Test 1: Health endpoint
echo "Test 1: Health Endpoint"
echo "----------------------"
HEALTH_RESPONSE=$(curl -s http://localhost:3001/health)
if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
    echo "✅ Health check passed"
    echo "Response: $HEALTH_RESPONSE"
else
    echo "❌ Health check failed"
    echo "Response: $HEALTH_RESPONSE"
fi
echo ""

# Test 2: Score endpoint
echo "Test 2: Score Endpoint"
echo "---------------------"
TEST_ADDRESS="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
SCORE_RESPONSE=$(curl -s "http://localhost:3001/api/scores/$TEST_ADDRESS")
if echo "$SCORE_RESPONSE" | grep -q "success"; then
    echo "✅ Score endpoint passed"
    echo "Response preview:"
    echo "$SCORE_RESPONSE" | head -5
else
    echo "❌ Score endpoint failed"
    echo "Response: $SCORE_RESPONSE"
fi
echo ""

# Test 3: Invalid address
echo "Test 3: Invalid Address Handling"
echo "--------------------------------"
INVALID_RESPONSE=$(curl -s "http://localhost:3001/api/scores/invalid" -w "\n%{http_code}")
HTTP_CODE=$(echo "$INVALID_RESPONSE" | tail -1)
if [ "$HTTP_CODE" = "400" ]; then
    echo "✅ Invalid address handling correct (400 Bad Request)"
else
    echo "⚠️  Unexpected HTTP code: $HTTP_CODE"
fi
echo ""

# Cleanup
echo "🧹 Cleaning up..."
kill $SERVER_PID 2>/dev/null || true
sleep 2

echo ""
echo "=============================="
echo "✅ Tests completed!"
echo ""
echo "To start server manually:"
echo "  cd backend && npm run dev"
echo ""






