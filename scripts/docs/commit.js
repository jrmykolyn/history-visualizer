#! /usr/bin/env node

const { execSync } = require('child_process');

try {
  execSync('git add ./docs');
  execSync('git commit -m "chore(docs): Update"');
} catch (err) {
  console.log('Failed to commit docs.');
  console.log(err);
}
