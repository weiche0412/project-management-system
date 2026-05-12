@echo off
cd /d "%~dp0"
set XDG_CONFIG_HOME=%CD%\.firebase-config
set FIREBASE_CLI_DISABLE_UPDATE_CHECK=1
.\node_modules\.bin\firebase.cmd deploy
pause
