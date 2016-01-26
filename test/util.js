'use strict';

var assert = require('assert');
var util = require('../lib/util');
var path = require('path');

describe('Util', function() {
  describe('#fsExistsSync()', function() {
    it('should return false when path is not existed', function() {
      var testPath = '/I/am/not/existed';
      assert.equal(util.fsExistsSync(testPath), false);
    });

    it('should return true when path is existed', function() {
      var testPath = path.join(__dirname, 'img', 'icon.png');
      assert.equal(util.fsExistsSync(testPath), true);
    });
  });
});
