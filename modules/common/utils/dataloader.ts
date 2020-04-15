export function orderByKeys(data, keys, keyName = 'id') {
  return keys.map(key => data.find(item => item[keyName] === key));
}
