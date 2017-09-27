import {compress, decompress} from 'lz-string';

const version = require('../../package.json').version;

let data = null;

export const clear = () => data = {version, values: {}};

try {
  data = JSON.parse(decompress(localStorage.audibleherocache)) || {};
  if (data && data.version !== version) {
    clear();
  }
} catch (ignored) {
}

export const save = () => {
  if (!data) {
    clear();
  }
  localStorage.audibleherocache = compress(JSON.stringify(data));
};

save();

export const get = key => {
  const value = data.values[key];
  if (!value) return null;

  const keys = value[0].sort();
  return value[1].map(val => val.reduce((res, val, index) => {
    const key = keys[index];
    res[key] = val;
    return res;
  }, {}));
}

export const set = (key, value) => {
  const keys = value.length > 0 ? Object.keys(value[0]).sort() : [];
  data.values[key] = [keys, value.map(val => keys.map(key => val[key]))];
};

export const getData = () => Object.keys(data.values).reduce((res, key) => {
  res[key] = get(key);
  return res;
}, {});

