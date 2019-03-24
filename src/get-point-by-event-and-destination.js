import {getRandomInteger} from './helpers/get-random-integer';
import {getRandomTime} from './helpers/get-random-time';
import {getRandomEndTime} from './helpers/get-random-end-time';
import {getRandomArrayElements} from './helpers/get-random-array-elements';
import {convertNumberToPriceFormat} from './helpers/convert-number-to-price-format';
export const getPointByEventAndDestination = (
    data = {}
) => {
  const events = data.events;
  const event = events[getRandomInteger(0, events.length - 1)];
  const destinations = data.destinations;
  const destinationsByEvent = destinations.get(event.type).get(event.subtype);
  const destination = destinationsByEvent[getRandomInteger(0, destinationsByEvent.length - 1)];
  const offers = data.offers;
  const offersByEvent = offers.get(event.type).get(event.subtype);
  const offersChosen = getRandomArrayElements(offersByEvent, 0, 2);
  const isFavorite = Math.random() > 0.7;
  const price = convertNumberToPriceFormat(getRandomInteger(1, 10));
  const startTime = getRandomTime();
  const endTime = event.type === `Transport` ? getRandomEndTime(startTime) : false;
  return {
    events,
    event,
    isFavorite,
    destinations,
    destination,
    price,
    offers,
    offersChosen,
    startTime,
    endTime
  };
};
