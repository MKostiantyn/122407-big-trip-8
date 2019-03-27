import {getAvailableDestinations} from "./get-available-destinations";
import {getAvailableOffers} from "./get-available-offers";
import {
  INPUT_TRAVEL_ROUTE_MAP as routes,
  EVENTS_ARRAY_MAP as eventsMap,
  DESTINATIONS_MAP as destinationsMap,
  SPECIAL_OFFERS_MAP as offersMap
} from "./initial-data";

export const getInitialDataMapped = () => routes.map((route) => {
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
