#!/bin/sh

# Install dependencies
npm install --quiet --prefix "$ROOT_DIR"

# Build Library and watch for changes in background
npm run watch --prefix "$ROOT_DIR" &

# Run storybook
npm run storybook --prefix "$ROOT_DIR"
