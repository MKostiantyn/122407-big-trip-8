import {CURRENT_ROUTE_DATA} from "./current-route-data";
import {getRandomInteger} from "./helpers/get-random-integer";
import {convertNumberToPriceFormat} from "./helpers/convert-number-to-price-format";
import {getRandomTime} from "./helpers/get-random-time";
import {getRandomEndTime} from "./helpers/get-random-end-time";
import {getInitialDataMapped} from "./get-initial-data-mapped";
import {getRandomArrayElements} from "./helpers/get-random-array-elements";

export const getPointData = () => {
  const place = CURRENT_ROUTE_DATA.place;
  const initialData = getInitialDataMapped();
  const pointData = Array.isArray(initialData) ? initialData.find((item) => typeof item === `object` && item.place === place) : {};
  const eventsByPlace = Array.isArray(pointData.events) ? pointData.events : [];
  const destinationsByPlace = typeof pointData.destinations === `object` ? pointData.destinations : {};
  const offersByPlace = typeof pointData.offers === `object` ? pointData.offers : {};
  const randomChosenEventIndex = eventsByPlace.length ? getRandomInteger(0, eventsByPlace.length - 1) : false;
  const randomChosenEvent = typeof randomChosenEventIndex === `number` ? eventsByPlace[randomChosenEventIndex] : false;
  const eventType = typeof randomChosenEvent === `object` ? randomChosenEvent[`type`] : false;
  const eventSubtype = typeof randomChosenEvent === `object` ? randomChosenEvent[`subtype`] : false;
  if (typeof randomChosenEvent === `object`) {
    randomChosenEvent[`isChosen`] = true;
  }
  const destinationsBySubtype = destinationsByPlace.hasOwnProperty(eventType) && destinationsByPlace[eventType].hasOwnProperty(eventSubtype) ? destinationsByPlace[eventType][eventSubtype] : [];
  const randomChosenDestinationIndex = Array.isArray(destinationsBySubtype) && destinationsBySubtype.length ? getRandomInteger(0, destinationsBySubtype.length - 1) : false;
  const randomChosenDestination = typeof randomChosenDestinationIndex === `number` ? destinationsBySubtype[randomChosenDestinationIndex] : false;
  if (typeof randomChosenDestination === `object`) {
    randomChosenDestination[`isChosen`] = true;
  }
  const offersBySubtype = offersByPlace.hasOwnProperty(eventType) && offersByPlace[eventType].hasOwnProperty(eventSubtype) ? offersByPlace[eventType][eventSubtype] : [];
  const randomChosenOffers = Array.isArray(offersBySubtype) && offersBySubtype.length ? getRandomArrayElements(offersBySubtype, 0 ,2) : [];
  if (Array.isArray(offersBySubtype) && offersBySubtype.length && Array.isArray(randomChosenOffers) && randomChosenOffers.length) {
    offersBySubtype.forEach((item) => {
      if (item.hasOwnProperty(`isChosen`)) {
        item[`isChosen`] = randomChosenOffers.includes(item);
      }
    });
  }
  pointData[`isFavorite`] = Math.random() > 0.7;
  pointData[`price`] = convertNumberToPriceFormat(getRandomInteger(1, 10));
  pointData[`startTime`] = getRandomTime();
  pointData[`endTime`] = eventType === `Transport` ? getRandomEndTime(pointData[`startTime`]) : false;
  if (eventType === `Transport` && eventSubtype !== `local` && typeof randomChosenDestination === `object`) {
    CURRENT_ROUTE_DATA.addPlace(randomChosenDestination[`title`]);
  }
  return pointData;
};
