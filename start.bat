@echo off
REM Real-Time System Monitor - Windows Quick Start Script

echo ==========================================
echo   Real-Time System Monitor - Setup
echo ==========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [X] Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

echo [+] Python found
python --version
echo.

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo [X] pip is not installed. Please install pip.
    pause
    exit /b 1
)

echo [+] pip found
pip --version
echo.

REM Install dependencies
echo [*] Installing Python dependencies...
pip install -r requirements.txt

if errorlevel 1 (
    echo [X] Failed to install dependencies
    pause
    exit /b 1
)

echo [+] Dependencies installed successfully
echo.

echo ==========================================
echo   Starting System Monitor Server
echo ==========================================
echo.

REM Navigate to backend directory
cd backend

REM Run the Flask application
python app.py

pause
