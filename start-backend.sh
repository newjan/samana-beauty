#!/bin/bash

# Start Django Backend Server
echo "🚀 Starting Django Backend..."
echo ""

cd server

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if requirements are installed
if [ ! -f "venv/bin/django-admin" ]; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
    echo "✅ Dependencies installed"
    echo ""
fi

# Run migrations (if needed)
echo "🔄 Running migrations..."
python manage.py migrate --noinput

echo ""
echo "✅ Backend server starting..."
echo "📍 Backend API: http://localhost:8000"
echo "📍 Admin Panel: http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
python manage.py runserver

