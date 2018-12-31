#! /usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Update and commit docs.
execSync('./scripts/docs/update.js && ./scripts/docs/commit.js');

// Extract new version
const {
  npm_package_version: packageVersion,
} = process.env;

// Update extension.
execSync(`npm run ext:build ${packageVersion}`);

// Update changelog.
const changelogFile = './CHANGELOG.md';
const content = fs.readFileSync(changelogFile, { encoding: 'utf-8' });

const date = new Date();
const yyyy = date.getFullYear();
const dd = date.getDate();
const mm = (date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1);
const dateStamp = `${yyyy}-${mm}-${dd}`;

const newContent = content.replace(/\[Unreleased\]/gi, `[${packageVersion}] - ${dateStamp}`);

fs.writeFileSync(changelogFile, newContent);

// Stage changes.
execSync('git add .');
