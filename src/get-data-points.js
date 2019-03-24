import {mapDestinations} from './map-destinations';
import {mapSpecialOffers} from './map-special-offers';

const INPUT_TRAVEL_ROUTE_ARRAY = [`Amsterdam`, `Barcelona`, `New York`, `Beijing`, `Amsterdam`];
const EVENT_TYPES_ARRAY_MAP = [
  {
    id: `Taxi`,
    type: `Transport`,
    subtype: `local`,
    title: `Taxi to`,
    icon: `🚕`
  },
  {
    id: `Bus`,
    type: `Transport`,
    subtype: `remote`,
    title: `Bus to`,
    icon: `🚌`
  },
  {
    id: `Train`,
    type: `Transport`,
    title: `Train to`,
    subtype: `remote`,
    icon: `🚂`
  },
  {
    id: `Ship`,
    type: `Transport`,
    subtype: `remote`,
    title: `Ship to`,
    icon: `🛳️`
  },
  {
    id: `Transport`,
    type: `Transport`,
    subtype: `remote`,
    title: `Transport to`,
    icon: `🚊`
  },
  {
    id: `Drive`,
    type: `Transport`,
    subtype: `local&remote`,
    title: `Drive to`,
    icon: `🚗`
  },
  {
    id: `Flight`,
    type: `Transport`,
    subtype: `remote`,
    title: `Flight to`,
    icon: `✈️`
  },
  {
    id: `Check-in`,
    type: `StopPlace`,
    subtype: `stay`,
    title: `Check into`,
    icon: `🏨️`
  },
  {
    id: `Sightseeing`,
    type: `StopPlace`,
    subtype: `visit`,
    title: `Visit`,
    icon: `🏛️`
  },
  {
    id: `Restaurant`,
    type: `StopPlace`,
    subtype: `eat`,
    title: `Eat in`,
    icon: `🍴`
  }
];
const DESTINATIONS_OFFER_MAP = new Map([
  [`Transport`, new Map([
    [`local`, [`airport`, `bus station`, `railway station`]],
    [`remote`, INPUT_TRAVEL_ROUTE_ARRAY.filter((route, index, self) => self.indexOf(route) === index)],
    [`local&remote`, INPUT_TRAVEL_ROUTE_ARRAY.filter((route, index, self) => self.indexOf(route) === index)],
  ])],
  [`StopPlace`, new Map([
    [`stay`, [`Hotel Transylvania`, `Grand Budapest Hotel`]],
    [`visit`, [`Empire State Building`, `Great Wall of China`, `Basilica de la Sagrada Familia`, `Jordaan`]],
    [`eat`, [`Guts & Glory`, `Edi & The Wolf`]],
  ])]
]);
const SPECIAL_OFFERS_MAP = new Map([
  [`Transport`, new Map([
    [`local`, [`Order Uber`, `Order MyTaxi`]],
    [`remote`, [`Choose seats`, `Add luggage`, `Switch to comfort class`]],
    [`local&remote`, [`Rent a car`, `Add luggage`]],
  ])],
  [`StopPlace`, new Map([
    [`stay`, [`Add breakfast`, `Add extra bed`, `Add late check-in`]],
    [`visit`, [`Add ticket`]],
    [`eat`, [`Add reservation table`]],
  ])]
]);
const specialOffersMapped = mapSpecialOffers(SPECIAL_OFFERS_MAP);
const destinationsMapped = mapDestinations(DESTINATIONS_OFFER_MAP);
export const pointsData = {
  routes: INPUT_TRAVEL_ROUTE_ARRAY,
  events: EVENT_TYPES_ARRAY_MAP,
  destinations: destinationsMapped,
  offers: specialOffersMapped
};
