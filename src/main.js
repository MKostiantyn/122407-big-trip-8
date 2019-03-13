import renderFilters from './render-filters';
import renderTripEvents from './render-trip-events';
import getRandomInteger from './helpers/get-random-integer';
import getOffersByPlaceAndEvent from './get-offers-by-place-and-event';
import getRoutEventPoints from './get-rout-event-points';


const EVENT_QUANTITY = 7;
const INPUT_TRAVEL_ROUTE_ARRAY = [`Amsterdam`, `Barcelona`, `New York`, `Beijing`, `Amsterdam`];
const EVENT_TYPES_ARRAY_MAP = [
  {
    id: `Taxi`,
    type: `Transport`,
    title: `Taxi to`,
    icon: `🚕`
  },
  {
    id: `Bus`,
    type: `Transport`,
    title: `Bus to`,
    icon: `🚌`
  },
  {
    id: `Train`,
    type: `Transport`,
    title: `Train to`,
    icon: `🚂`
  },
  {
    id: `Ship`,
    type: `Transport`,
    title: `Ship to`,
    icon: `🛳️`
  },
  {
    id: `Transport`,
    type: `Transport`,
    title: `Transport to`,
    icon: `🚊`
  },
  {
    id: `Drive`,
    type: `Transport`,
    title: `Drive to`,
    icon: `🚗`
  },
  {
    id: `Flight`,
    type: `Transport`,
    title: `Flight to`,
    icon: `✈️`
  },
  {
    id: `Check-in`,
    type: `StopPlace`,
    title: `Check into`,
    icon: `🏨️`
  },
  {
    id: `Sightseeing`,
    type: `StopPlace`,
    title: `Visit to`,
    icon: `🏛️`
  },
  {
    id: `Restaurant`,
    type: `StopPlace`,
    title: `Eat in`,
    icon: `🍴`
  }
];
const SPECIAL_OFFERS_MAP = new Map([
  [`Transport`, [
    {title: `Switch to comfort class`},
    {title: `Choose seats`},
    {title: `Add luggage`}
  ]],
  [`StopPlace`, [
    {title: `Add meal`}
  ]]
]);
const SPECIAL_OFFERS_MATCHING_DATA = getOffersByPlaceAndEvent(INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, SPECIAL_OFFERS_MAP);
console.log(SPECIAL_OFFERS_MATCHING_DATA);
const ROUTE_EVENT_POINTS = getRoutEventPoints(INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, SPECIAL_OFFERS_MATCHING_DATA, EVENT_QUANTITY);
console.log(`________________`);
console.log(ROUTE_EVENT_POINTS);
const FILTER_ITEMS_ARRAY = [`Everything`, `Future`, `Past`];
const filtersForm = document.querySelector(`.trip-filter`);
const tripDayItemsBlock = document.querySelector(`.trip-day__items`);

filtersForm.innerHTML = renderFilters(FILTER_ITEMS_ARRAY);
tripDayItemsBlock.innerHTML = renderTripEvents(EVENT_QUANTITY);

const filters = filtersForm.querySelectorAll(`[name='filter']`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      tripDayItemsBlock.innerHTML = renderTripEvents(getRandomInteger(1, 10));
    });
  });
}
