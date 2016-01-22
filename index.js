'use strict';

var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var os = require('os');

module.exports = function(input, output, cb) {
  var suffix = '-' + Date.now() + '-pngdefry';
  var pngdefryBinPath;

  // Darwin
  // Linux
  // Windows_NT
  if (os.type() === 'Darwin') {
    pngdefryBinPath = path.join(__dirname, 'pngdefry', 'bin', 'osx', 'pngdefry');
  } else if (os.type() === 'Linux') {
    pngdefryBinPath = path.join(__dirname, 'pngdefry', 'bin', 'linux', 'pngdefry');
  } else {
    pngdefryBinPath = path.join(__dirname, 'pngdefry', 'bin', 'windows', 'pngdefry');
  }

  var newOutput = getNewOutput(output);
  var outputFilePath = getOutputFilePath(input, newOutput);

  convert(input, newOutput, outputFilePath, function(err) {
    if (err) {
      cb(err);
      return;
    }

    cb();
  });

  // /////////////////////////////
  function getNewOutput(output) {
    var arr = output.split(path.sep);
    arr.pop();
    return arr.join(path.sep);
  }

  function getOutputFilePath(input, newOutput) {
    var inputArr = input.split(path.sep);
    var originFileName = inputArr[inputArr.length - 1];
    var outputFilePath = path.join(newOutput, originFileName.replace(/\.png$/, suffix + '.png'));
    return outputFilePath;
  }

  function convert(input, newOutput, outputFilePath, cb) {
    var converted = true;
    var pd = cp.exec(pngdefryBinPath + ' -s ' +  suffix + ' -o ' + newOutput + ' ' +  input, {});

    pd.stdout.on('data', function(data) {
      console.log(data.toString());

      if (data.toString().indexOf('not a PNG file') > -1) {
        converted = false;
      }
    });

    pd.on('exit', function(code) {
      if (code !== 0) {
        return cb('convert fail');
      }

      if (!converted) {
        return cb('convert fail, not a PNG file');
      }

      if (!fsExistsSync(outputFilePath)) {
        return cb('convert fail');
      }

      fs.renameSync(outputFilePath, output);
      cb();
    });

  }

  function fsExistsSync(path) {
    try {
      fs.accessSync(path, fs.F_OK);
    } catch (e) {
      return false;
    }

    return true;
  }

};
