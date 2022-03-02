#!/usr/bin/env node

import { createRequire } from 'module';
import program from 'commander';
import genDiff from '../index.js';

const require = createRequire(import.meta.url);
const packageConfig = require('../package.json');

const { version, description } = packageConfig;

program
  .version(version)
  .description(description)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });

program.parse(process.argv);
