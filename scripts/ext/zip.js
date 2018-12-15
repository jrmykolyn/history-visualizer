#! /usr/env/bin node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const { CONFIG } = require('.'); 

try {
  const { extPath, zipPath, rootPath } = CONFIG;
  const pkg = require(`${rootPath}/package.json`);

  if (!fs.existsSync(extPath)) throw new Error('Please ensure that the `ext/` directory exists.');

  // Add temporary directory.
  if (fs.existsSync(zipPath)) throw new Error('Please ensure that the zip directory does not exist.');
  fs.mkdirSync(zipPath);

  // Migrate files.
  const files = fs.readdirSync(extPath);
  if (files && files.length) {
    files.forEach((fileName) => {
      fs.copyFileSync(`${extPath}/${fileName}`, `${zipPath}/${fileName}`);
    });
  }

  // Zip.
  execSync(`zip -j -r ${pkg.name}.zip ${zipPath}`);

  // Remove temporary directory.
  fs.removeSync(zipPath);

} catch(e) {
  console.log('Whoops, something went wrong!');
  console.log(e.message);
}
