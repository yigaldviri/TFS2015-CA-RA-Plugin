#!/bin/bash

echo ---         NPM INSTALL       ---
npm install --strict-ssl false

[ $? -ne 0 ] && echo "Error during NPM" && exit 1;

echo ---         GULP INSTALL       ---
npm install gulp

[ $? -ne 0 ] && echo "Error during INSTALL GULP" && exit 1;

echo ---      TFX GLOBAL INSTALL    ---
npm install -g tfx tfx-cli

[ $? -ne 0 ] && echo "Error during TFX GLOBAL INSTALL" && exit 1;

echo ---           DEPLOY          ---
gulp

[ $? -ne 0 ] && echo "Error during GULP" && exit 1;

exit 0;

