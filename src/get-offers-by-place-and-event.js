import getRandomInteger from './helpers/get-random-integer';
import getRandomArrayElements from './helpers/get-random-array-elements';

export default (places = [], events = [], offers = new Map()) => places.reduce((accumulator, item) => {
  events.forEach((value) => {
    const id = `${item} - ${value.id}`;
    const matchingOffersArray = getRandomArrayElements(offers.get(value.type), 0, 2);
    accumulator.set(id, matchingOffersArray.map((element) => {
      return {
        price: getRandomInteger(1, 20),
        title: element.title
      };
    })
    );
  });
  return accumulator;
}, new Map());
