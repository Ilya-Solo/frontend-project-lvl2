import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import genDiffTree from './genDiffTree.js';
import format from './formatters/index.js';

const getData = (configFilePath) => {
  const filePath = configFilePath;
  const currentDir = process.cwd();
  const absolutePath = path.resolve(currentDir, filePath);
  const extensionName = path.extname(absolutePath).slice(1);
  const data = fs.readFileSync(absolutePath, 'utf8');

  return parse(data, extensionName);
};

export default (filePathBefore, filePathAfter, outputFormatterType = 'stylish') => {
  const dataBefore = getData(filePathBefore);
  const dataAfter = getData(filePathAfter);
  const diffTree = genDiffTree(dataBefore, dataAfter);
  const formattedDiffTree = format(diffTree, outputFormatterType);

  return formattedDiffTree;
};
