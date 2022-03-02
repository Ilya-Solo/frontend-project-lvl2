import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const parse = (data, type) => parsers[type](data);

export default parse;
