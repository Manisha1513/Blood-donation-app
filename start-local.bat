@echo off
echo ========================================
echo Blood Donation Management System
echo Local Development Startup
echo ========================================
echo.

echo Checking services...
echo.

REM Check if PostgreSQL is running
sc query postgresql-x64-14 | find "RUNNING" >nul
if errorlevel 1 (
    echo [!] PostgreSQL is NOT running
    echo     Start it from services.msc
    echo.
) else (
    echo [OK] PostgreSQL is running
)

REM Check if MongoDB is running
sc query MongoDB | find "RUNNING" >nul
if errorlevel 1 (
    echo [!] MongoDB is NOT running
    echo     Start it from services.msc
    echo.
) else (
    echo [OK] MongoDB is running
)

echo.
echo ========================================
echo Starting Backend and Frontend...
echo ========================================
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Check the new terminal windows for logs.
echo.
pause
