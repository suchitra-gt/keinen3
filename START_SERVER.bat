@echo off
echo ========================================================
echo Starting Keinen API Server
echo ========================================================
echo.

cd server

if not exist node_modules (
    echo [1/2] Installing missing dependencies...
    npm install
) else (
    echo [1/2] Dependencies found!
)

echo [2/2] Booting up Node.js server...
node index.js

echo.
echo Server has stopped. Please read any error messages above.
pause
