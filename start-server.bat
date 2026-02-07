@echo off
cd /d "%~dp0"
echo Starting Backend Server (MongoDB Enabled)...
echo.
REM Using default node command to run the updated API server
node api/server.js
pause
