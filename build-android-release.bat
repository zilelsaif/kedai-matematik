@echo off
setlocal

echo ==========================================
echo   KEDAI MATEMATIK - ANDROID RELEASE BUILD
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/5] Sync production files ke www...

if not exist "www" mkdir "www"

copy /Y "index.html" "www\index.html" >nul
copy /Y "style.css" "www\style.css" >nul
copy /Y "game.js" "www\game.js" >nul
copy /Y "measurement.js" "www\measurement.js" >nul
copy /Y "fraction.js" "www\fraction.js" >nul
copy /Y "money.js" "www\money.js" >nul

if exist "privacy.html" (
    copy /Y "privacy.html" "www\privacy.html" >nul
)

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

echo [2/5] Sync Capacitor ke Android...

call npx cap sync android

if errorlevel 1 (
    echo.
    echo ERROR: Capacitor sync gagal.
    pause
    exit /b 1
)

echo.
echo [3/5] Gunakan JDK 21 LTS...

set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

java -version

if errorlevel 1 (
    echo.
    echo ERROR: JDK 21 tidak dapat digunakan.
    pause
    exit /b 1
)

echo.
echo [4/5] Semak release signing...

if not exist "android\keystore.properties" (
    echo.
    echo ERROR: android\keystore.properties tidak ditemui.
    echo Release AAB tidak boleh ditandatangani.
    pause
    exit /b 1
)

echo OK - keystore.properties ditemui.
echo.

echo [5/5] Build signed AAB...

cd android

call gradlew.bat --stop >nul 2>&1
call gradlew.bat bundleRelease

if errorlevel 1 (
    echo.
    echo ==========================================
    echo RELEASE BUILD GAGAL
    echo ==========================================
    pause
    exit /b 1
)

if not exist "app\build\outputs\bundle\release\app-release.aab" (
    echo.
    echo ERROR: Build selesai tetapi app-release.aab tidak ditemui.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo RELEASE BUILD SUCCESSFUL
echo ==========================================
echo.
echo AAB:
echo %~dp0android\app\build\outputs\bundle\release\app-release.aab
echo.
echo Jangan lupa:
echo - versionCode mesti meningkat untuk setiap upload baru ke Google Play.
echo - Jangan kongsi keystore.properties atau fail .jks.
echo.

explorer "%~dp0android\app\build\outputs\bundle\release"

pause