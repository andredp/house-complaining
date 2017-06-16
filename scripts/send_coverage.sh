# !/usr/bin/env sh
npm run coverage && cat ./coverage/lcov.info | ./node_modules/codacy-coverage/bin/codacy-coverage.js && rm -rf ./coverage
