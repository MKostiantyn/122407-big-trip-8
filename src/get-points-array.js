import {pointsData} from './get-data-points';
import {getPointByEventAndDestination} from './get-point-by-event-and-destination';
export default (quantity) => [...new Array(quantity)].map(() => getPointByEventAndDestination(pointsData));
