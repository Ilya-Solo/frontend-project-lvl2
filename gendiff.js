#!/usr/bin/env node

// This example shows a simple use of addHelpText.
// This is used as an example in the README.

// const { Command } = require('commander'); // (normal include)
const { Command } = require('commander');
const program = new Command();

program.description('Compares two configuration files and shows a difference.');
program.version('1.0.0', '-V, --version', 'output the version number');
program.helpOption('-h, --help', 'output usage information');
program.option('-f, --format [type]', 'output format');
program
  .arguments('<filepath1> <filepath2>');

program.parse(process.argv);
