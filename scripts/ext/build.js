#! /usr/bin/env node

const fs = require('fs');

const root = `${__dirname}/../..`;
const extPath = `${root}/ext`;
const distPath = `${root}/dist`;
const manifestPath = `${extPath}/manifest.json`;
const pkg = require(`${root}/package.json`);
const manifestData = require(manifestPath);

try {
  // UPDATE MANIFEST
  manifestData.author = pkg.author;
  manifestData.description = pkg.description;
  manifestData.version = pkg.version;

  // WRITE MANIFEST
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), { encoding: 'utf-8' });

  // MIGRATE MAIN SCRIPT
  fs.copyFileSync(`${distPath}/main.js`, `${extPath}/main.js`);
} catch (e) {
  console.log('Whoops, something went wrong!');
  console.log(e.message);
}
