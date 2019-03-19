import renderFilters from './render-filters';
import renderPoints from './render-points';
import getRandomInteger from './helpers/get-random-integer';
import getOffersByPlaceAndEvent from './get-offers-by-place-and-event';
import getPointsByRouteEventPlace from './get-points-by-route-event-place';


const EVENT_QUANTITY = 7;
const FILTER_ITEMS_ARRAY = [`Everything`, `Future`, `Past`];
const INPUT_TRAVEL_ROUTE_ARRAY = [`Amsterdam`, `Barcelona`, `New York`, `Beijing`, `Amsterdam`];
const EVENT_TYPES_ARRAY_MAP = [
  {
    id: `Taxi`,
    type: `Transport`,
    title: `Taxi to`,
    icon: `🚕`,
    place: [`airport`, `bus station`, `railway station`]
  },
  {
    id: `Bus`,
    type: `Transport`,
    title: `Bus to`,
    icon: `🚌`,
    place: [`airport`, `bus station`, `railway station`]
  },
  {
    id: `Train`,
    type: `Transport`,
    title: `Train to`,
    icon: `🚂`,
    place: INPUT_TRAVEL_ROUTE_ARRAY
  },
  {
    id: `Ship`,
    type: `Transport`,
    title: `Ship to`,
    icon: `🛳️`,
    place: INPUT_TRAVEL_ROUTE_ARRAY
  },
  {
    id: `Transport`,
    type: `Transport`,
    title: `Transport to`,
    icon: `🚊`,
    place: INPUT_TRAVEL_ROUTE_ARRAY
  },
  {
    id: `Drive`,
    type: `Transport`,
    title: `Drive to`,
    icon: `🚗`,
    place: INPUT_TRAVEL_ROUTE_ARRAY
  },
  {
    id: `Flight`,
    type: `Transport`,
    title: `Flight to`,
    icon: `✈️`,
    place: INPUT_TRAVEL_ROUTE_ARRAY
  },
  {
    id: `Check-in`,
    type: `StopPlace`,
    title: `Check into`,
    icon: `🏨️`,
    place: [`Grand Budapest Hotel`, `Hotel Transylvania`]
  },
  {
    id: `Sightseeing`,
    type: `StopPlace`,
    title: `Visit`,
    icon: `🏛️`,
    place: [`Empire State Building`, `Great Wall of China`, `Basilica de la Sagrada Familia`, `Jordaan`]
  },
  {
    id: `Restaurant`,
    type: `StopPlace`,
    title: `Eat in`,
    icon: `🍴`,
    place: [`Guts & Glory`, `Edi & The Wolf`]
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

let specialOffersMatchingData = getOffersByPlaceAndEvent(INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, SPECIAL_OFFERS_MAP);
let pointsByRouteEventPlace = getPointsByRouteEventPlace(INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, specialOffersMatchingData, EVENT_QUANTITY);
console.log(specialOffersMatchingData);
console.log(pointsByRouteEventPlace);

const filtersForm = document.querySelector(`.trip-filter`);
const tripDayItemsBlock = document.querySelector(`.trip-day__items`);

filtersForm.innerHTML = renderFilters(FILTER_ITEMS_ARRAY);
tripDayItemsBlock.innerHTML = renderPoints(pointsByRouteEventPlace);

const filters = filtersForm.querySelectorAll(`[name='filter']`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      tripDayItemsBlock.innerHTML = renderPoints(getRandomInteger(1, 10));
    });
  });
}
