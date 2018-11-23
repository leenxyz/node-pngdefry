'use strict';

var cp = require('child_process');
var os = require('os');
var path = require('path');
var fs = require('fs');
var util = require('./lib/util');

if (os.type() === 'Linux') {
  var linuxPath = path.join(process.cwd(), 'lib', 'pngdefry', 'bin', 'linux');
  var pngdefryPath = path.join(process.cwd(), 'lib', 'pngdefry', 'source', 'pngdefry');

  if (!util.fsExistsSync(linuxPath)) {
    fs.mkdirSync(linuxPath);
  }

  var makeFileDir = path.join(process.cwd(), 'lib', 'pngdefry', 'source');
  var command = 'cd ' + makeFileDir + ' && make';

  cp.exec(command, {}, function(error, stdout, stderr) {
    if (error) {
      throw new Error('install fail');
    }

    cp.exec('mv ' + pngdefryPath + ' ' + linuxPath, {});
  });
}
