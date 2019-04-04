import {currentRouteData} from "./current-route-data-component";
import {getInitialDataByPlace} from "./get-initial-data-by-place";
import {getRandomInteger} from "./helpers/get-random-integer";
import {convertNumberToPriceFormat} from "./helpers/convert-number-to-price-format";
import {getRandomTime} from "./helpers/get-random-time";
import {getRandomEndTime} from "./helpers/get-random-end-time";
import {getRandomArrayElements} from "./helpers/get-random-array-elements";

export const getPointData = () => {
  const place = currentRouteData.place;
  const pointData = getInitialDataByPlace(place);
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
  switch (eventType) {
    case `Transport`: {
      switch (eventSubtype) {
        case `local`: {
          if (place) {
            currentRouteData.addPlace(place);
          }
          break;
        }
        default: {
          if (typeof randomChosenDestination === `object`) {
            currentRouteData.addPlace(randomChosenDestination[`title`]);
          }
        }
      }
      break;
    }
    case `StopPlace`: {
      if (place) {
        currentRouteData.addPlace(place);
      }
      break;
    }
  }
  return pointData;
};
