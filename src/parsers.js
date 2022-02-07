import yaml from 'js-yaml';

const parsers = {
    json: JSON.parse,
    yml: yaml.load
    //ini: ini.parse,
};

const parse = (data, type) => parsers[type](data);

export default parse;