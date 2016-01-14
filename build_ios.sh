#!/bin/bash
set -e

react-native bundle --entry-file=src/main.ios.js --platform=ios --bundle-output=./ios/main.jsbundle
