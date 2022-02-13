import genDiffTree from './gendiff1.js';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import _ from 'lodash';


const tab = ' ';
let tabCount = 1;
let tabCount2 = 1;



const getData = (configFilePath) => {
    const absolutePath = path.resolve(configFilePath);
    const extensionName = path.extname(absolutePath).slice(1);
    const data = fs.readFileSync(absolutePath, 'utf8');
    
    return parse(data, extensionName);
  };
  const data2 = getData('/home/user/Рабочий стол/frontend-project-lvl2/__fixtures__/Before.json');
  const data1 = getData('/home/user/Рабочий стол/frontend-project-lvl2/__fixtures__/After.json');



const normalizedValue = (value) => {
  
  if (!_.isObject(value)) {
    return value;
  }
  let padding =  tab.repeat(tabCount += 4);
  const convertObjectToString = ([key, objectValue]) => {
     
    return `\n${padding}${key}: ${normalizedValue(objectValue)}`;
  }
  return `{${(Object.entries(value).map(convertObjectToString)).join(``)}\n${tab.repeat(tabCount -= 4)}}`;
};

const mapping = (obj) => {
let newpadding = tab.repeat(tabCount2 += 1);
const types = {
   added: () => ` - ${obj.key}: ${normalizedValue(obj.value2)}\n`,
   removed: () => ` + ${obj.key}: ${normalizedValue(obj.value1)}\n`,
   nested: () => `   ${obj.key}: {\n${(obj.value1.map(mapping)).join(``)}\n   }\n`,
   unchanged: () => `   ${obj.key}: ${normalizedValue(obj.value1)}\n`,
   changed: () => ` - ${obj.key}: ${normalizedValue(obj.value2)}\n + ${obj.key}: ${normalizedValue(obj.value1)}\n`
  }
  return types[obj.type]();
};

  const aaa = ((genDiffTree(data1, data2)).map(mapping)).join('\n');
  console.log(`{\n${aaa}\n}`);
