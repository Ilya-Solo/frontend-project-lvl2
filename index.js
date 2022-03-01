import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import genDiffTree from "./src/genDiffTree.js";
import json from "./src/formatters/jsonFormat.js"
import plain from "./src/formatters/plain.js"
import stylish from "./src/formatters/stylish.js"

const getData = (configFilePath) => {
    const filePath = configFilePath;
    const currentDir = process.cwd();
    const absolutePath = path.resolve(currentDir, filePath);
    const extensionName = path.extname(absolutePath).slice(1);
    const data = fs.readFileSync(absolutePath, 'utf8');
    
    return parse(data, extensionName);
  };

const formaters = {
    stylish,
    plain,
    json,
};
  
const format = (data, type) => formaters[type](data);
    
export default (filePathBefore, filePathAfter, outputFormatterType ) => {
    const dataBefore = getData(filePathBefore);
    const dataAfter = getData(filePathAfter);
    const diffTree = genDiffTree(dataBefore, dataAfter);
    const formattedDiffTree = format(diffTree, outputFormatterType);
  
    return formattedDiffTree;
  };