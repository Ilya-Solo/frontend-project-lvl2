#!/usr/bin/env node
import _ from 'lodash';

const file1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };

const file2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
};






const getDiffTree = (dataBefore, dataAfter) => {
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
    if (dataBefore[key] == dataAfter[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: dataBefore[key],
      }
    }
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
        return {
          name: key,
          type: 'nested',
          children: getDiffTree(dataBefore[key], dataAfter[key])
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

console.log(JSON.stringify(getDiffTree(file1, file2)));

