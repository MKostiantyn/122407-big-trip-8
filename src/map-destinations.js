import {getRandomInteger} from "./helpers/get-random-integer";
import {getRandomDescription} from "./helpers/get-random-description";

export const mapDestinations = (destinations = new Map()) => {
  destinations.forEach((subtypes) => {
    subtypes.forEach((item, name) => {
      const mappedDestinations = item.reduce((accumulator, title) => {
        const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
        const description = getRandomDescription(TEXT);
        const picturesQuantity = getRandomInteger(0, 10);
        const pictures = [...new Array(picturesQuantity)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
        accumulator.push({
          description,
          pictures,
          title
        });
        return accumulator;
      }, []);
      subtypes.set(name, mappedDestinations);
    });
  });
  return destinations;
};
