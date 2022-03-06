import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import _ from 'lodash';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, ext) => path
  .join(__dirname, '..', '__fixtures__', `${filename}.${ext}`);

const getExpectedResult = (outputFormatterType) => {
  const expectedResultFileName = `diff-${(outputFormatterType)}`;
  const expectedResultFilePath = getFixturePath(expectedResultFileName, 'txt');

  return fs.readFileSync(expectedResultFilePath, 'utf-8');
};

const inputDataTypes = ['json', 'yml'];
const outputFormatterTypes = ['stylish', 'plain', 'json'];
const getTestsSet = (types1, types2) => types1
  .flatMap((type1) => types2
    .map((type2) => ([type1, type2])));

test.each(getTestsSet(inputDataTypes, outputFormatterTypes))(
  'genDiff read %s files and generate %s format output',
  (inputDataType, outputFormatterType) => {
    const filepathBefore = getFixturePath('Before', inputDataType);
    const filepathAfter = getFixturePath('After', inputDataType);
    const currentResult = genDiff(filepathBefore, filepathAfter, outputFormatterType);

    const expectedResult = getExpectedResult(outputFormatterType);

    expect(currentResult).toEqual(expectedResult);
  },
);
