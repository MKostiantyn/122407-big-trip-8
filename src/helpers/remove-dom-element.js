export const removeDomElement = (element) => {
  if (element && element.nodeName) {
    element.parentNode.removeChild(element);
  }
};
