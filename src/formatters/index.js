import json from './jsonFormat.js';
import format from './plain.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formaters = {
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => json(data),
};
const formater = (data, type) => formaters[type](data);
export default formater;
