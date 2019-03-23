import {INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, specialOffersMatchingData} from './get-data-for-route-event-place';
import getPointByRouteEventPlace from './get-point-by-route-event-place';

export default (quantity) => [...new Array(quantity)].map(() => getPointByRouteEventPlace(INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, specialOffersMatchingData));
