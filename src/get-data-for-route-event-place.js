import getOffersByPlaceAndEvent from "./get-offers-by-place-and-event";

const PICTURES_QUANTITY = 10;
const INPUT_TRAVEL_ROUTE_ARRAY = [`Amsterdam`, `Barcelona`, `New York`, `Beijing`, `Amsterdam`];
const EVENT_TYPES_ARRAY_MAP = [
  {
    id: `Taxi`,
    type: `Transport`,
    title: `Taxi to`,
    icon: `🚕`,
    place: [`airport`, `bus station`, `railway station`],
    pictures: []
  },
  {
    id: `Bus`,
    type: `Transport`,
    title: `Bus to`,
    icon: `🚌`,
    place: [`airport`, `bus station`, `railway station`],
    pictures: []
  },
  {
    id: `Train`,
    type: `Transport`,
    title: `Train to`,
    icon: `🚂`,
    place: INPUT_TRAVEL_ROUTE_ARRAY,
    pictures: [...new Array(PICTURES_QUANTITY)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    id: `Ship`,
    type: `Transport`,
    title: `Ship to`,
    icon: `🛳️`,
    place: INPUT_TRAVEL_ROUTE_ARRAY,
    pictures: [...new Array(PICTURES_QUANTITY)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    id: `Transport`,
    type: `Transport`,
    title: `Transport to`,
    icon: `🚊`,
    place: INPUT_TRAVEL_ROUTE_ARRAY,
    pictures: [...new Array(PICTURES_QUANTITY)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    id: `Drive`,
    type: `Transport`,
    title: `Drive to`,
    icon: `🚗`,
    place: INPUT_TRAVEL_ROUTE_ARRAY,
    pictures: [...new Array(PICTURES_QUANTITY)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    id: `Flight`,
    type: `Transport`,
    title: `Flight to`,
    icon: `✈️`,
    place: INPUT_TRAVEL_ROUTE_ARRAY,
    pictures: [...new Array(PICTURES_QUANTITY)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    id: `Check-in`,
    type: `StopPlace`,
    title: `Check into`,
    icon: `🏨️`,
    place: [`Grand Budapest Hotel`, `Hotel Transylvania`],
    pictures: []
  },
  {
    id: `Sightseeing`,
    type: `StopPlace`,
    title: `Visit`,
    icon: `🏛️`,
    place: [`Empire State Building`, `Great Wall of China`, `Basilica de la Sagrada Familia`, `Jordaan`],
    pictures: []
  },
  {
    id: `Restaurant`,
    type: `StopPlace`,
    title: `Eat in`,
    icon: `🍴`,
    place: [`Guts & Glory`, `Edi & The Wolf`],
    pictures: []
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
const specialOffersMatchingData = getOffersByPlaceAndEvent(INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, SPECIAL_OFFERS_MAP);

export {INPUT_TRAVEL_ROUTE_ARRAY, EVENT_TYPES_ARRAY_MAP, specialOffersMatchingData};
