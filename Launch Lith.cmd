@echo off
cd /d "%~dp0"
if not exist "%~dp0node_modules\electron\dist\electron.exe" (
  echo Please extract the whole Lith folder before launching.
  pause
  exit /b 1
)
start "Lith" "%~dp0node_modules\electron\dist\electron.exe" "%~dp0."
