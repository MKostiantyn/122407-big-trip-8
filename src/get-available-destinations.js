import {getRandomImagesArray} from "./helpers/get-random-images-array";
import {getRandomDescription} from "./helpers/get-random-description";
export const getAvailableDestinations = (destinations, route) => {
  if (typeof destinations === `object`) {
    return Object.keys(destinations).reduce((accumulatorType, type) => {
      const subtypes = typeof destinations[type] === `object` ? destinations[type] : {};
      accumulatorType[type] = Object.keys(subtypes).reduce((accumulatorSubtype, subtype) => {
        const destinationsAvailable = subtypes[subtype][route];
        accumulatorSubtype[subtype] = destinationsAvailable.reduce((destinationsAccumulator, destination) => {
          destinationsAccumulator.push({
            title: destination,
            isChosen: false,
            pictures: getRandomImagesArray(0, 10),
            description: getRandomDescription()
          });
          return destinationsAccumulator;
        }, []);
        return accumulatorSubtype;
      }, {});
      return accumulatorType;
    }, {});
  }
  return {};
};
