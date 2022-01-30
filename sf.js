import _ from 'lodash';

const getDiffType = (valueBefore, valueAfter) => {
  if (valueBefore === undefined) return 'added';
  if (valueAfter === undefined) return 'removed';
  if (valueBefore !== valueAfter) return 'updated';
  return 'unchanged';
};

const buildDiffTree = (dataBefore, dataAfter) => {
  const unsortedKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  const sortedKeys = _.sortBy(unsortedKeys);

  const addEntry = (key) => {
    const entry = {};
    entry.name = key;

    const valueBefore = dataBefore[key];
    const valueAfter = dataAfter[key];
    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      entry.type = 'diffTree';
      entry.children = buildDiffTree(valueBefore, valueAfter);
    } else {
      const diffType = getDiffType(valueBefore, valueAfter);
      entry.type = diffType;
      if (diffType === 'added' || diffType === 'unchanged') entry.value = valueAfter;
      if (diffType === 'removed') entry.value = valueBefore;
      if (diffType === 'updated') {
        entry.valueBefore = valueBefore;
        entry.valueAfter = valueAfter;
      }
    }

    return entry;
  };

  return sortedKeys.map(addEntry);
};

export default buildDiffTree;
