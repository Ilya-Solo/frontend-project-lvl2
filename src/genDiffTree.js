import _ from 'lodash';
import fp from 'lodash/fp.js'
console.log(fp);
const genDiffTree = (dataBefore, dataAfter) => {
  const keysBefore = _.keys(dataBefore);
  const keysAfter = _.keys(dataAfter);
  const unsortedKeys = _.union(keysBefore, keysAfter);
  const sortedKeys = _.sortBy(unsortedKeys, (o) => o.toLowerCase());

  const defineKeyParams = (key) => {
    const value1 = dataBefore[key];
    const value2 = dataAfter[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        type: 'nested',
        value1: genDiffTree(value1, value2),
      };
    }
    if (!_.has(dataBefore, key)) {
      return {
        key,
        type: 'added',
        value2,
      };
    }
    if (!_.has(dataAfter, key)) {
      return {
        key,
        type: 'removed',
        value1,
      };
    }
    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        value1,
        value2,
      };
    }

    return {
      key,
      type: 'unchanged',
      value1: dataBefore[key],
    };
  };
  return sortedKeys.map(defineKeyParams);
};

export default genDiffTree;
