#!/bin/bash

# Start Next.js Frontend Server
echo "🚀 Starting Next.js Frontend..."
echo ""

cd client

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

echo "✅ Frontend server starting..."
echo "📍 Website: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev

