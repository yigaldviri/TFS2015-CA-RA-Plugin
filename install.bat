@echo off
echo ---         NPM INSTALL       ---
set CURRENT_STEP="NPM"
cmd /c npm install --strict-ssl false
if NOT "%ERRORLEVEL%" == "0" goto done_errors

echo ---      INSTALL GULP    ---
set CURRENT_STEP="INSTALL GULP"
cmd /c npm install -g gulp
if NOT "%ERRORLEVEL%" == "0" goto done_errors

echo ---      TFX GLOBAL INSTALL    ---
set CURRENT_STEP="TFX INSTALL"
cmd /c npm install -g tfx tfx-cli
if NOT "%ERRORLEVEL%" == "0" goto done_errors

echo ---           DEPLOY          ---
set CURRENT_STEP=Gulp
cmd /c gulp
if NOT "%ERRORLEVEL%" == "0" goto done_errors

echo ~~~~~ GREAT SUCCESSSS ~~~~~~

rem Exit the script with successful exit code (0)
exit /b 0

:done_errors
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo ~~~~~ Errors in %CURRENT_STEP% ~~~~~
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exit /b 1
