@echo off
TITLE Sponsora - Full Stack Launcher
echo ==========================================
echo    STARTING SPONSORA PLATFORM
echo ==========================================
echo.
echo [1/2] Launching MAIN APP...
start "Sponsora Main App" cmd /k "cd main-app && npm run dev"
echo.
echo [2/2] Launching ADMIN APP...
start "Sponsora Admin App" cmd /k "cd admin-app && npm run dev"
echo.
echo ==========================================
echo Both applications are now starting!
echo Keep this window open if you want to restart them.
echo ==========================================
pause
