'use strict';

var should = require('should');
var path = require('path');
var rewire = require('rewire');
var index = rewire('../lib/index');

describe('Index', function() {
  describe('#getOutputDir()', function() {
    it('should return a path that not contain the file name', function() {
      var output = path.join('Users', 'forsigner', 'repos', 'icon-new.png');
      var ouputDir = index.__get__('getOutputDir')(output);
      ouputDir.should.equal(path.join('Users', 'forsigner', 'repos'));
    });
  });

  describe('#getOutputFilePath()', function() {
    it('should return a path that not contain the file name', function() {
      var input = path.join('Users', 'forsigner', 'repos', 'icon.png');
      var outputDir = path.join('Users', 'forsigner', 'repos');
      var suffix = '-new';
      var outputFilePath = index.__get__('getOutputFilePath')(input, outputDir, suffix);
      outputFilePath.should.equal(path.join('Users', 'forsigner', 'repos', 'icon-new.png'));
    });
  });
});
