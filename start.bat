@echo off
cd /d "%~dp0"

echo Installing dependencies...
call npm install

echo.
echo Starting server...
echo URL: http://localhost:3000
echo.

node server.js
pause
