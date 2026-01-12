#!/bin/bash

# Start both backend and frontend servers
# Usage: ./start-all.sh

set -e

echo "🚀 Starting ProofScore Development Servers"
echo "==========================================="
echo ""

# Check if we're in the project root
if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if backend is already running
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Backend is already running on port 3001"
else
    echo "📦 Starting backend server..."
    cd backend
    npm run dev > /tmp/proofscore-backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    echo "✅ Backend started (PID: $BACKEND_PID)"
    echo "   Logs: tail -f /tmp/proofscore-backend.log"
fi

# Wait for backend to be ready
echo ""
echo "⏳ Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Backend is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start after 30 seconds"
        echo "   Check logs: tail -f /tmp/proofscore-backend.log"
        exit 1
    fi
    sleep 1
done

# Check if frontend is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Frontend is already running on port 3000"
else
    echo ""
    echo "📦 Starting frontend server..."
    cd frontend
    npm run dev > /tmp/proofscore-frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
    echo "   Logs: tail -f /tmp/proofscore-frontend.log"
fi

echo ""
echo "==========================================="
echo "✅ Both servers are running!"
echo ""
echo "📍 Backend:  http://localhost:3001"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit" INT

# Keep script running
wait






