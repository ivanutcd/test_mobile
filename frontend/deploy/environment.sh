#!/bin/sh

echo 'Starting environment configuration'
cd /usr/share/nginx/html
ls -1la
rm -rf /usr/share/nginx/html/env-config.js

{
  echo "window._env_ = {"
  echo "  $ENVIRONMENT"
  echo "  VERSION: '$APP_VERSION'"
  echo "};"
} >> env-config.js

cat env-config.js
