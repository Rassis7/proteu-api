export const removeNullFields = target => {
  Object.keys(target).map(key => {
    if (target[key] instanceof Object) {
      if (
        !Object.keys(target[key]).length &&
        typeof target[key].getMonth !== 'function'
      ) {
        delete target[key];
      } else {
        removeNullFields(target[key]);
      }
    } else if (target[key] === null) {
      delete target[key];
    }
  });

  return target;
};
