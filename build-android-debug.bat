@echo off
setlocal

echo ==========================================
echo   KEDAI MATEMATIK - ANDROID DEBUG BUILD
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/4] Sync production files ke www...

if not exist "www" mkdir "www"

copy /Y "index.html" "www\index.html" >nul
copy /Y "privacy.html" "www\privacy.html" >nul
copy /Y "style.css" "www\style.css" >nul
copy /Y "game.js" "www\game.js" >nul
copy /Y "money.js" "www\money.js" >nul
copy /Y "measurement.js" "www\measurement.js" >nul
copy /Y "fraction.js" "www\fraction.js" >nul

if exist "favicon.svg" (
    copy /Y "favicon.svg" "www\favicon.svg" >nul
)

robocopy "assets" "www\assets" /MIR >nul

if errorlevel 8 (
    echo.
    echo ERROR: Gagal sync folder assets.
    pause
    exit /b 1
)

echo OK - www sudah dikemas kini.
echo.

echo [2/4] Sync Capacitor ke Android...

call npx cap sync android

if errorlevel 1 (
    echo.
    echo ERROR: Capacitor sync gagal.
    pause
    exit /b 1
)

echo.
echo [3/4] Gunakan JDK 21 LTS...

set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

java -version

echo.
echo [4/4] Build APK debug...

cd android
call gradlew.bat assembleDebug

if errorlevel 1 (
    echo.
    echo ==========================================
    echo BUILD GAGAL
    echo ==========================================
    pause
    exit /b 1
)

echo.
echo ==========================================
echo BUILD SUCCESSFUL
echo ==========================================
echo.
echo APK:
echo %~dp0android\app\build\outputs\apk\debug\app-debug.apk
echo.

explorer "%~dp0android\app\build\outputs\apk\debug"

pause
