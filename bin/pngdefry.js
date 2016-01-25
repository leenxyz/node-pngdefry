#! /usr/bin/env node
'use strict';

var program = require('commander');
var pngdefry = require('../lib/index');
var path = require('path');
var pkg = require('../package.json');
var util = require('../lib/util');

program
  .version('v' + pkg.version)
  .option('-v, --version', 'display version')
  .option('-i, --input-file <path>', 'input file')
  .option('-o, --output-file <path>', 'ouput file');

program.on('--help', function() {
  console.log('  Examples:');
  console.log();
  console.log('    pngdefry -i icon.png -o icon.new.png');
  console.log();
});

program.parse(process.argv);

var input = path.isAbsolute(program.inputFile) ? program.inputFile : path.join(process.cwd(), program.inputFile);
var output = path.isAbsolute(program.outputFile) ? program.outputFile : path.join(process.cwd(), program.outputFile);

checkInput(input);
checkOutPut(program.outputFile);
action(input, output);

// ///////////////
function action(input, output) {
  pngdefry(input, output, function(err) {
    if (err) {
      throw new Error(err);
    }

    console.log('convert success');
  });
}

function checkInput(input) {
  if (!util.fsExistsSync(input)) {
    throw new Error('input file is not a file');
  }
}

function checkOutPut(output) {
  // TODO
  if (!path.isAbsolute(output)) {
    output = path.isAbsolute(output) ? output : path.join(process.cwd(), output);
  }

  if (util.fsExistsSync(output)) {
    throw new Error('out file is existed');
  }

}
