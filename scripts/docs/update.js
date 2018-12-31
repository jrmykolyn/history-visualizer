#! /usr/bin/env node

const { execSync } = require('child_process');

try {
  execSync('npm run docs');
} catch (err) {
  console.log('Failed to update docs.');
  console.log(err);
}
