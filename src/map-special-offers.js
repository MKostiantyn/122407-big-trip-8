import {getRandomInteger} from './helpers/get-random-integer';
import {convertNumberToPriceFormat} from './helpers/convert-number-to-price-format';

export const mapSpecialOffers = (offers = new Map()) => {
  offers.forEach((subtypes) => {
    subtypes.forEach((item, name) => {
      const mappedOffers = item.reduce((accumulator, title) => {
        accumulator.push({
          price: convertNumberToPriceFormat(getRandomInteger(1, 20)),
          title,
          id: title.toLowerCase().replace(/ /g, `-`)
        });
        return accumulator;
      }, []);
      subtypes.set(name, mappedOffers);
    });
  });
  return offers;
};
