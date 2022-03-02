import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const interExtensionNames = ['json', 'yml'];

const getFilePath = (extensionNames) => extensionNames.map((extensionName) => ([
  path.resolve(__dirname, `__fixtures__/Before.${extensionName}`),
  path.resolve(__dirname, `__fixtures__/After.${extensionName}`),
]));

const getResultPath = (format) => {
  const result = path.resolve(__dirname, `__fixtures__/diff-${format}.txt`);
  return fs.readFileSync(result, 'utf8');
};

test.each(getFilePath(interExtensionNames))(
  'generate difference between two configuration files',
  (beforeFilePath, afterFilePath) => {
    expect(gendiff(beforeFilePath, afterFilePath, 'pretty')).toEqual(getResultPath('pretty'));
    expect(gendiff(beforeFilePath, afterFilePath, 'plain')).toEqual(getResultPath('plain'));
    expect(gendiff(beforeFilePath, afterFilePath, 'json')).toEqual(getResultPath('json'));
  },
);
