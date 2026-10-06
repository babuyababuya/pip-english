@echo off
cd /d "%~dp0"
start "" cmd /c "timeout /t 1 >nul & start http://127.0.0.1:8731/"
where py >nul 2>&1 && py -3 -m http.server 8731 && goto :eof
where python >nul 2>&1 && python -m http.server 8731 && goto :eof
start "" "%~dp0index.html"
echo Python was not found. Opened index.html directly.
pause
