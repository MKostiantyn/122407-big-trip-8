export const createObjectFromArrayWithData = (array, data) => array.reduce((total, key) => {
  const object = Object.assign({}, total);
  object[key] = data;
  return object;
}, {});
