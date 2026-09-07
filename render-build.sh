#!/usr/bin/env bash
set -e

# Install Puppeteer’s bundled Chromium before starting
npx puppeteer browsers install chrome@stable
