import genDiffTree from '../genDiffTree.js';
import fs from 'fs';
import path from 'path';
import parse from '../parsers.js';
import _ from 'lodash';
import format1 from './plain.js';
import jsonFormat from './jsonFormat.js';


const tab = ' ';






const getData = (configFilePath) => {
    const absolutePath = path.resolve(configFilePath);
    const extensionName = path.extname(absolutePath).slice(1);
    const data = fs.readFileSync(absolutePath, 'utf8');
    
    return parse(data, extensionName);
  };
  const data1 = getData('/home/user/Рабочий стол/frontend-project-lvl2/__fixtures__/Before.json');
  const data2 = getData('/home/user/Рабочий стол/frontend-project-lvl2/__fixtures__/After.json');



const render = (value, depth, stringify) => {
  
  if (!_.isObject(value)) {
    return value;
  }
  const newDepth = depth + 4;
  const convertObjectToString = ([key, objectValue]) => {
     
    return `${stringify(key, render(objectValue, newDepth, stringify), newDepth, ' ')}`;
  }
  return `{\n${(Object.entries(value).map(convertObjectToString)).join(`\n`)}\n${tab.repeat(newDepth - 1)} }`;
};
const  stringify = (key, value, depth, sign) => `${tab.repeat(depth)}  ${sign} ${key}: ${render(value, depth, stringify)}`

  const mapping = {
    
      
    unchanged: (obj, depth) => stringify(obj.key, obj.value1, depth, ' '),
    removed: (obj, depth) => stringify(obj.key, obj.value1, depth, '-'),
    added: (obj, depth) => stringify(obj.key, obj.value2, depth, '+'),
    changed: (obj, depth) => [
      stringify(obj.key, obj.value1, depth, '-'),
      stringify(obj.key, obj.value2, depth, '+'),
    ],
    nested: (obj, depth, innerFormat) => stringify(
      obj.key,
      innerFormat(obj.value1, depth + 4),
      depth,
      ' ',
    ),
  };
  const format = (diffTree) => {
    const innerFormat = (innerDiffTree, depth) => {
      const strings = innerDiffTree
        .flatMap((obj) => mapping[obj.type](obj, depth, innerFormat));
      const framedStrigs = ['{', ...strings, tab.repeat(depth) + '}'];
      return framedStrigs.join('\n');
    };
  
    return innerFormat(diffTree, 0);
  };
   //const aaa = genDiffTree(data1, data2);
   //console.log(format1(aaa));
   export default format;



  
  
