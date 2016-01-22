'use strict';

var cp = require('child_process');
var os = require('os');
var path = require('path');
var fs = require('fs');

if (os.type() === 'Linux') {
  var linuxPath = path.join(process.cwd(), 'pngdefry', 'bin', 'linux');
  var pngdefryPath = path.join(process.cwd(), 'pngdefry', 'source', 'pngdefry');

  if (!fsExistsSync(linuxPath)) {
    fs.mkdir(linuxPath);
  }

  var makeFileDir = path.join(process.cwd(), 'pngdefry', 'source');
  var command = 'cd ' + makeFileDir + ' && make';

  cp.exec(command, {}, function(error, stdout, stderr) {
    if (error) {
      throw new Error('install fail');
    }

    cp.exec('mv ' + pngdefryPath + ' ' + linuxPath, {});
  });
}

// ///////////////////
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }

  return true;
}
