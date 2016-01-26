'use strict';

var should = require('should');
var path = require('path');
var rewire = require('rewire');
var index = rewire('../lib/index');

describe('Index', function() {
  describe('#getNewOutput()', function() {
    it('should return a path that not contain the file name', function() {
      var output = path.join('Users', 'forsigner', 'repos', 'icon-new.png');
      var newOuput = index.__get__('getNewOutput')(output);
      newOuput.should.equal(path.join('Users', 'forsigner', 'repos'));
    });
  });
});
