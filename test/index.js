'use strict';

var assert = require('assert');
var util = require('../lib/util');
var path = require('path');

describe('Util', function() {
  describe('#fsExistsSync()', function() {
    it('should return false when path is not existed', function() {
      assert.equal(util.fsExistsSync('/I/am/not/existed'), false);
    });

    it('should return true when path is existed', function() {
      var testPath = path.join(__dirname, 'img', 'icon-60.png');
      assert.equal(util.fsExistsSync(testPath), true);
    });
  });
});
