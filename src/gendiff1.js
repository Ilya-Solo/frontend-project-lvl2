
import _ from 'lodash';





const genDiffTree = (dataBefore, dataAfter) => {
  const keysBefore = _.keys(dataBefore);
  const keysAfter = _.keys(dataAfter);
  const unsortedKeys = _.union(keysBefore, keysAfter); 
  const sortedKeys = unsortedKeys.sort();

  const defineKeyParams = (key) => {
  
    
    if (!_.has(dataBefore, key)) {
      return {
        name: key,
        type: 'added',
        value: dataAfter[key]
      }
    }
    if (!_.has(dataAfter, key)) {
      return {
        name: key,
        type: 'removed',
        value: dataBefore[key]
      }
    } 
    if (dataBefore[key] !== dataAfter[key]) {
      return {
        name: key,
        type: 'changed',
        value1: dataBefore[key],
        value2: dataAfter[key]
      }
    }
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
        return {
          name: key,
          type: 'nested',
          children: genDiffTree(dataBefore[key], dataAfter[key])
        }
    }
    return {
      name: key,
      type: 'unchanged',
      value: dataBefore[key]
    }
  }
  return sortedKeys.map(defineKeyParams);
} 

export default genDiffTree;


