'use strict';

var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var util = require('./util');

module.exports = function(input, output, cb) {
  var suffix = '-' + Date.now() + '-pngdefry';
  var pngdefryBinPath = util.getPngdefryBinPath();
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
    var command = pngdefryBinPath + ' -s ' + suffix + ' -o ' + newOutput + ' ' + input;
    console.log(command);

    cp.exec(command, {}, function(error, stdout, stderr) {
      if (error) {
        return cb(error);
      }

      if (stdout.indexOf('not a PNG file') > -1) {
        return cb('convert fail, not a PNG file');
      }

      if (!util.fsExistsSync(outputFilePath)) {
        console.log('pngdefry is taking too much time to write the file on disk.');
      }

      console.log(stdout);
      try{
        fs.renameSync(outputFilePath, output);
        cb();
      } catch (e) {
        console.log(e);
        return false;
      }
    });
  }

};
