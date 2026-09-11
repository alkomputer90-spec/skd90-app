@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js belum tersedia. Buka index.html untuk mencoba desain.
  pause
  exit /b 1
)
echo Buka http://127.0.0.1:8089 di browser.
echo Biarkan jendela ini terbuka. Tekan Ctrl+C untuk berhenti.
node server.cjs
pause
