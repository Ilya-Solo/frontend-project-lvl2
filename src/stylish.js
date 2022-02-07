import genDiffTree from './gendiff1.js';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const tab = '  ';

const getData = (configFilePath) => {
    const absolutePath = path.resolve(configFilePath);
    const extensionName = path.extname(absolutePath).slice(1);
    const data = fs.readFileSync(absolutePath, 'utf8');
  
    return parse(data, extensionName);
  };
  const data1 = getData('/home/user/Рабочий стол/frontend-project-lvl2/__fixtures__/Before.yml');
  const data2 = getData('/home/user/Рабочий стол/frontend-project-lvl2/__fixtures__/After.yml');
  
  
const added = (obj) => `  -  ${obj.name}: ${obj.value}`;
const removed = (obj) => `  +  ${obj.name}: ${obj.value}`;
const nested = (obj) => `    ${obj.name}: ${(obj.value).map(mapping)}`;
const unchanged = (obj) => `     ${obj.name}: ${obj.value}`;
const changed = (obj) => `  +  ${obj.name}: ${obj.value1}\n  -  ${obj.name}: ${obj.value2}`
const mapping = (obj) => {
    
    if(obj.type  === 'removed'){return removed(obj)};
    if(obj.type  === 'added'){return added(obj)};
    if(obj.type  === 'changed'){return changed(obj)};
    if(obj.type  === 'unchanged'){return unchanged(obj)};
    if(obj.type  === 'nested'){return nested(obj)};
    
  };
  const aaa = genDiffTree(data1, data2).map(mapping).join('\n');
  console.log(`{\n${aaa}\n}`);
