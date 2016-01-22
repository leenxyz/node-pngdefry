'use strict';

var cp = require('child_process');
var os = require('os');

if (os.type() === 'Linux') {
  cp.exec('mkdir -p pngdefry\/bin\/linux && cd pngdefry\/source && make &&  && mv pngdefry ..\/bin\/linux', {});
}
