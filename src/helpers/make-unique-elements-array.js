export const makeUniqueElementsArray = (array) => array.filter((route, index, self) => self.indexOf(route) === index);
