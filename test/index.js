'use strict';

var should = require('should');
var path = require('path');
var fs = require('fs');
var rewire = require('rewire');
var pngdefry = rewire('../lib/index');
var Magic = require('mmmagic').Magic;
var magic = new Magic();

describe('Index', function() {

  describe('#pngdefry()', function() {
    it('should repair png success', function(done) {
      this.timeout(5000);
      var input = path.join(__dirname, 'img', 'icon.png');
      var output = path.join(__dirname, 'img', 'icon-new.png');

      pngdefry(input, output, function(err) {
        if (err) {
          return;
        }

        magic.detectFile(output, function(err, result) {
          if (err) {
            throw err;
          }

          // result=>PNG image data, 60 x 60, 8-bit/color RGBA, non-interlaced
          result.should.match(/non-interlaced/);
          fs.unlinkSync(output);
          done();
        });
      });
    });
  });

  describe('#getOutputDir()', function() {
    it('should return a path that not contain the file name', function() {
      var output = path.join('Users', 'forsigner', 'repos', 'icon-new.png');
      var ouputDir = pngdefry.__get__('getOutputDir')(output);
      ouputDir.should.equal(path.join('Users', 'forsigner', 'repos'));
    });
  });

  describe('#getOutputFilePath()', function() {
    it('should return a path that not contain the file name', function() {
      var input = path.join('Users', 'forsigner', 'repos', 'icon.png');
      var outputDir = path.join('Users', 'forsigner', 'repos');
      var suffix = '-new';
      var outputFilePath = pngdefry.__get__('getOutputFilePath')(input, outputDir, suffix);
      outputFilePath.should.equal(path.join('Users', 'forsigner', 'repos', 'icon-new.png'));
    });
  });
});
