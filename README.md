# node-pngdefry [![Build Status](https://travis-ci.org/forsigner/node-pngdefry.svg?branch=master)](https://travis-ci.org/forsigner/node-pngdefry)

Repairing iPhone fried PNGs using Node.js

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

var input = path.join(__dirname, 'icon-72.png');
var output = path.join(__dirname, 'icon.new.png');

pngdefry(input, output, function(err) {
  if (err) {
    return;
  }

  console.log('success');
});

```
