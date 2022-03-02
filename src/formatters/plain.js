import _ from 'lodash';

const processedValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const mapping = {
  unchanged: () => '',
  removed: (property) => `Property '${property}' was removed`,
  added: (property, obj) => `Property '${property}' was added with value: ${processedValue(obj.value2)}`,
  changed: (property, obj) => `Property '${property}' was updated. From ${processedValue(obj.value1)} to ${processedValue(obj.value2)}`,
  nested: (property, obj, innerFormat) => innerFormat(obj.value1, property),
};
const removeEmptyStrings = (string) => string !== '';
const format = (diffTree) => {
  const innerFormat = (diff, path) => {
    const callback = (obj) => {
      const { key, type } = obj;
      const property = path ? `${path}.${key}` : key;

      return mapping[type](property, obj, innerFormat);
    };

    return diff.map(callback).filter(removeEmptyStrings).join('\n');
  };

  return innerFormat(diffTree, '');
};
export default format;
