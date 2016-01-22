'use strict';

var cp = require('child_process');
var os = require('os');

if (os.type() === 'Linux') {
  cp.exec('cd pngdefry\/source && make && mv pngdefry ..\/bin\/linux', {});
}
