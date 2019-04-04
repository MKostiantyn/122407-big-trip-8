export const removeAllChildrenFromElement = (element) => {
  if (element && element.nodeName) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
};
