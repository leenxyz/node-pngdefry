'use strict';

var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var util = require('./util');
var suffix = '-' + Date.now() + '-pngdefry';

module.exports = pngdefry;

function pngdefry(input, output, cb) {
  var pngdefryBinPath = util.getPngdefryBinPath();
  var outputDir = getOutputDir(output);
  var outputFilePath = getOutputFilePath(input, outputDir);

  convert(input, outputDir, outputFilePath, pngdefryBinPath, suffix, function(err) {
    if (err) {
      cb(err);
      return;
    }

    cb();
  });
}

/**
 * get output directory from original output
 * @param  {string} output
 * @return {string} outputDir
 * @private
 */
function getOutputDir(output) {
  var arr = output.split(path.sep);
  arr.pop();
  return arr.join(path.sep);
}

/**
 * get temp output file path with our suffix
 * @param  {string} output
 * @return {string} outputDir
 * @return {string} suffix
 * @return {string} outputFilePath
 * @private
 */
function getOutputFilePath(input, outputDir, suffix) {
  var inputArr = input.split(path.sep);
  var originFileName = inputArr[inputArr.length - 1];
  var newFileName = originFileName.replace(/\.png$/, suffix + '.png');
  var outputFilePath = path.join(outputDir, newFileName);
  return outputFilePath;
}

function convert(input, outputDir, outputFilePath, pngdefryBinPath, suffix, cb) {
  var command = pngdefryBinPath + ' -s ' + suffix + ' -o ' + outputDir + ' ' + input;

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
    fs.rename(outputFilePath, output, function(err) {
      if (err) {
        throw err;
      }

      cb();
    });
  });
}
