export const objectDeepCopying = (sourceObject) => {
  const iterateObject = (iterationObject) => {
    const accumulatorElement = Array.isArray(iterationObject) ? [] : {};
    return Object.keys(iterationObject).reduce((total, item) => {
      if (iterationObject[item]
        && typeof iterationObject[item] === `object`
        && (iterationObject[item].constructor === Object || iterationObject[item].constructor === Array)) {
        total[item] = iterateObject(iterationObject[item]);
      } else {
        total[item] = iterationObject[item];
      }
      return total;
    }, accumulatorElement);
  };
  return iterateObject(sourceObject);
};