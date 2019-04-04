import {getAvailableDestinations} from "./get-available-destinations";
import {getAvailableOffers} from "./get-available-offers";
import {
  uniqueTravelRoutes as routes,
  EVENTS_ARRAY_MOCK as eventsMap,
  DESTINATIONS_MOCK as destinationsMap,
  SPECIAL_OFFERS_MOCK as offersMap
} from "./initial-data";

export const initialDataMapped = routes.map((route) => {
  const startTime = null;
  const endTime = null;
  const price = null;
  const isFavorite = false;
  const destinations = getAvailableDestinations(destinationsMap, route);
  const offers = getAvailableOffers(offersMap, route);
  const events = eventsMap.reduce((total, item) => {
    total.push(Object.assign({}, item));
    return total;
  }, []);
  return {
    startTime,
    endTime,
    price,
    isFavorite,
    destinations,
    events,
    place: route,
    offers
  };
});
