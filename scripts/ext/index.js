const rootPath = `${__dirname}/../..`;
const distFile = 'main.js';
const distPath = `${rootPath}/dist`;
const extPath = `${rootPath}/ext`;
const zipPath = `${rootPath}/history-visualizer`;

module.exports = {
  CONFIG: {
    distFile,
    distPath,
    extPath,
    rootPath,
    zipPath,
  },
};
