const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');

var DIR = path.join(process.cwd(), 'bin');

mkdirp.sync('bin');

webpack(
  {
    entry: './index.js',
    output: {
      filename: 'index.js',
      path: __dirname + '/bin',
      library: {
        type: 'commonjs2',
      },
    },
  },
  (err) => {
    if (err) {
      console.warn(err);
      return;
    }

    var json = fs.readJsonSync('package.json');
    json.private = false;
    fs.writeJsonSync(path.join(DIR, 'package.json'), json);

    console.log('done, now: cd bin && npm publish');
  }
);
