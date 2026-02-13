#!/bin/bash

# Real-Time System Monitor - Quick Start Script
# This script sets up and runs the system monitor

echo "=========================================="
echo "  Real-Time System Monitor - Setup"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip."
    exit 1
fi

echo "✓ pip3 found: $(pip3 --version)"
echo ""

# Install dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo "Trying with --break-system-packages flag..."
    pip3 install -r requirements.txt --break-system-packages
fi

echo ""
echo "=========================================="
echo "  Starting System Monitor Server"
echo "=========================================="
echo ""

# Navigate to backend directory
cd backend

# Run the Flask application
python3 app.py
