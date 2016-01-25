'use strict';

var os = require('os');
var fs = require('fs');

module.exports = {
  fsExistsSync: function(path) {
    try {
      fs.accessSync(path, fs.F_OK);
    } catch (e) {
      return false;
    }

    return true;
  },

  getPngdefryBinPath: function() {
    var binPaths = {
      Darwin: path.join(__dirname, 'pngdefry', 'bin', 'osx', 'pngdefry'),
      Linux: path.join(__dirname, 'pngdefry', 'bin', 'osx', 'pngdefry'),
      Windows_NT: path.join(__dirname, 'pngdefry', 'bin', 'windows', 'pngdefry')
    };

    return binPaths[os.type()];
  }
};
