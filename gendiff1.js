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


//const getTypeDiff = (arr1, arr2) {
  //if()
//}

const getTypeOfDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2); 

  const result = {};
  for (const key of keys) {
    if (!_.has(data1, key)) {
      result[key] = 'added';
    } else if (!_.has(data2, key)) {
      result[key] = 'deleted';
    } else if (data1[key] !== data2[key]) {
      result[key] = 'changed';
    } else {
      result[key] = 'unchanged';
    }
  }

  return result;
};

const genDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  console.log('{');
  for(const key of keys) {
    
    if (!_.has(data1, key)) {
      console.log(`  +   ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      console.log(`  -   ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      console.log(`  -   ${key}: ${data1[key]}`);
      console.log(`  +   ${key}: ${data2[key]}`);
    } else {
      console.log(`      ${key}: ${data2[key]}`);
    }
  }
  console.log('}');
} 

genDiff(file1, file2);

