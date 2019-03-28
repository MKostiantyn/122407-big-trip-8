import {convertNumberToPriceFormat} from "./helpers/convert-number-to-price-format";
import {getRandomInteger} from "./helpers/get-random-integer";

export const getAvailableOffers = (offers, route) => {
  if (typeof offers === `object`) {
    return Object.keys(offers).reduce((accumulatorType, type) => {
      const subtypes = typeof offers[type] === `object` ? offers[type] : {};
      accumulatorType[type] = Object.keys(subtypes).reduce((accumulatorSubtype, subtype) => {
        const offersAvailable = subtypes[subtype][route];
        accumulatorSubtype[subtype] = offersAvailable.reduce((offersAccumulator, title) => {
          const price = convertNumberToPriceFormat(getRandomInteger(1, 8));
          const isChosen = false;
          const id = title.toLowerCase().replace(/ /g, `-`);
          offersAccumulator.push({
            title,
            isChosen,
            id,
            price
          });
          return offersAccumulator;
        }, []);
        return accumulatorSubtype;
      }, {});
      return accumulatorType;
    }, {});
  }
  return {};
};
