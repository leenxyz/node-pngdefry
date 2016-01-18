# pngdefry [![Build Status](https://travis-ci.org/forsigner/pngdefry.svg?branch=master)](https://travis-ci.org/forsigner/pngdefry)


# Install

```
$ npm install -g pngdefry
```
or

```
$ npm install pngdefry --save-dev
```


## Usage

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
