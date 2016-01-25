'use strict';

var fs = require('fs');

module.exports = {
  fsExistsSync: function(path) {
    try {
      fs.accessSync(path, fs.F_OK);
    } catch (e) {
      return false;
    }

    return true;
  }
};
