#! /usr/bin/env node

const fs = require('fs-extra');
const { CONFIG } = require('.');

try {
  const { distFile, distPath, extPath, rootPath } = CONFIG;

  if (!fs.existsSync(extPath)) throw new Error('Please ensure that the `ext/` directory exists.');
  if (!fs.existsSync(distPath)) throw new Error('Please ensure that the `dist/` directory exists.');

  const manifestPath = `${extPath}/manifest.json`;

  if (!fs.existsSync(manifestPath)) throw new Error('Please ensure that the `ext/` directory contains a `manifest.json` file.');

  const pkg = require(`${rootPath}/package.json`);
  const manifestData = require(manifestPath);

  // UPDATE MANIFEST
  manifestData.author = pkg.author;
  manifestData.description = pkg.description;
  manifestData.version = pkg.version;

  // WRITE MANIFEST
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), { encoding: 'utf-8' });

  // MIGRATE MAIN SCRIPT
  if (!fs.existsSync(`${distPath}/${distFile}`)) throw new Error(`Please ensure that the \`dist\` directory contains a \`${distFile}\` file.`);
  fs.copyFileSync(`${distPath}/${distFile}`, `${extPath}/${distFile}`);
} catch (e) {
  console.log('Whoops, something went wrong!');
  console.log(e.message);
}
