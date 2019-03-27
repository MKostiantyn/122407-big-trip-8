import {getRandomInteger} from "./get-random-integer";
export const getRandomImagesArray = (minimum, maximum) => {
  const picturesQuantity = getRandomInteger(minimum, maximum);
  return [...new Array(picturesQuantity)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};
