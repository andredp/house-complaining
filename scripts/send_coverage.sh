#!/usr/bin/env sh
npm run coverage && ./node_modules/codacy-coverage/bin/codacy-coverage.js < ./coverage/lcov.info && rm -rf ./coverage
