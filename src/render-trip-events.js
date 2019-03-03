import renderTripEvent from './render-trip-event';
export default (quantity) => [...new Array(quantity)].reduce((currentValue) => currentValue + renderTripEvent(), ``);
