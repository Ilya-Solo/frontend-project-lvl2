import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import genDiffTree from "./src/genDiffTree.js";
import jsonFormat from "./src/formatters/jsonFormat.js"
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

export default (file1, file2, format) => {
    const formatters = {
        plain: plain(),
        json: jsonFormat(),
        stylish: stylish()
    }
    const file1Data = getData(file1);
    const file2Data = getData(file2);
    return formatters[format](genDiffTree(file1Data, file2Data));

}