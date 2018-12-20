const mock = require('mock-require');

const paths = [
  '../src/tags/app/index.js',
];

paths.forEach(path => mock(path));
