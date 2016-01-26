# node-pngdefry [![Build Status](https://travis-ci.org/forsigner/node-pngdefry.svg?branch=master)](https://travis-ci.org/forsigner/node-pngdefry) [![NPM Version](http://img.shields.io/npm/v/pngdefry.svg?style=flat)](https://www.npmjs.org/package/pngdefry)

Repairing iPhone fried PNGs using Node.js.

This is a Node.js wrapper for [pngdefry](http://www.jongware.com/pngdefry.html) command line tool (created by Jongware) that reverses [CgBI](http://iphonedevwiki.net/index.php/CgBI_file_format) optimization on png images included into iPA files to make the images readable by the browser.

### Why you may need it ?

If you want for any reason to extract App Icons (PNG images) out of iPA files (iOS Apps) you will need this ; becuase you gonna find that those extracted PNG images are not readable by the browser . 

Apple uses [PNGCursh](http://pmt.sourceforge.net/pngcrush/) open source library to crush png images inside iPA files, to revese this provess back you need to do it throw pngdefy lib. 

### Command line

``` bash
$ npm install -g pngdefry
```
then run:

``` bash
$ pngdefry -i icon.png -o icon.new.png
```

### In Node project


``` bash
$ npm install pngdefry --save-dev
```

``` js
var pngdefry = require('pngdefry');
var path = require('path');

var input = path.join(__dirname, 'icon.png');
var output = path.join(__dirname, 'icon.new.png');

pngdefry(input, output, function(err) {
  if (err) {
    return;
  }

  console.log('success');
});

```

### Test

``` bash
$ npm test
```
