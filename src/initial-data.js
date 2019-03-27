import {makeUniqueElementsArray} from "./helpers/make-unique-elements-array";
import {createObjectFromArrayWithData} from "./helpers/create-object-from-array-with-data";

const INPUT_TRAVEL_ROUTE_MAP = [`Amsterdam`, `Barcelona`, `New York`, `Beijing`, `Amsterdam`];
const UNIQUE_TRAVEL_ROUTE_MAP = makeUniqueElementsArray(INPUT_TRAVEL_ROUTE_MAP);
const EVENTS_ARRAY_MAP = [
  {
    id: `Taxi`,
    type: `Transport`,
    subtype: `local`,
    title: `Taxi to`,
    icon: `🚕`,
    isChosen: false
  },
  {
    id: `Bus`,
    type: `Transport`,
    subtype: `remote`,
    title: `Bus to`,
    icon: `🚌`,
    isChosen: false
  },
  {
    id: `Train`,
    type: `Transport`,
    title: `Train to`,
    subtype: `remote`,
    icon: `🚂`,
    isChosen: false
  },
  {
    id: `Ship`,
    type: `Transport`,
    subtype: `remote`,
    title: `Ship to`,
    icon: `🛳️`,
    isChosen: false
  },
  {
    id: `Transport`,
    type: `Transport`,
    subtype: `remote`,
    title: `Transport to`,
    icon: `🚊`,
    isChosen: false
  },
  {
    id: `Drive`,
    type: `Transport`,
    subtype: `local&remote`,
    title: `Drive to`,
    icon: `🚗`,
    isChosen: false
  },
  {
    id: `Flight`,
    type: `Transport`,
    subtype: `remote`,
    title: `Flight to`,
    icon: `✈️`,
    isChosen: false
  },
  {
    id: `Check-in`,
    type: `StopPlace`,
    subtype: `stay`,
    title: `Check into`,
    icon: `🏨️`,
    isChosen: false
  },
  {
    id: `Sightseeing`,
    type: `StopPlace`,
    subtype: `visit`,
    title: `Visit`,
    icon: `🏛️`,
    isChosen: false
  },
  {
    id: `Restaurant`,
    type: `StopPlace`,
    subtype: `eat`,
    title: `Eat in`,
    icon: `🍴`,
    isChosen: false
  }
];
const DESTINATIONS_MAP = {
  'Transport': {
    'local': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`airport`, `bus station`, `railway station`]),
    'remote': {
      'Amsterdam': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `Amsterdam` !== item),
      'Barcelona': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `Barcelona` !== item),
      'New York': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `New York` !== item),
      'Beijing': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `Beijing` !== item)
    },
    'local&remote': {
      'Amsterdam': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `Amsterdam` !== item),
      'Barcelona': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `Barcelona` !== item),
      'New York': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `New York` !== item),
      'Beijing': UNIQUE_TRAVEL_ROUTE_MAP.filter((item) => `Beijing` !== item)
    }
  },
  'StopPlace': {
    'stay': {
      'Amsterdam': [`Pulitzer`, `Waldorf Astoria`, `De L’Europe`],
      'Barcelona': [`Mandarin Oriental Hotel`, `Cotton House Hotel`, `Majestic Hotel & Spa`],
      'New York': [`The Mercer`, `The Surrey`, `NoMad Hotel`],
      'Beijing': [`Rosewood`, `The Peninsula`, `Waldorf Astoria`]
    },
    'visit': {
      'Amsterdam': [`Van Gogh Museum`, `Rijksmuseum`, `Dam Square`],
      'Barcelona': [`La Sagrada Familia`, `Park Guell`, `Casa Batllo`],
      'New York': [`Statue of Liberty National Monument`, `Central Park`, `Empire State Building`],
      'Beijing': [`Great Wall of China`, `The Palace Museum`, `Summer Palace`]
    },
    'eat': {
      'Amsterdam': [`De Silveren Spiegel`, `Ciel Bleu Restaurant`, `Mount Everest Tandoori`],
      'Barcelona': [`La Dama`, `La Barra de Carles Abellan`, `Bicnic`],
      'New York': [`Blue Hill`, `Per Se`, `Daniel`],
      'Beijing': [`King's Joy`, `Siji Minfu`, `Dali Courtyard`]
    }
  }
};
const SPECIAL_OFFERS_MAP = {
  'Transport': {
    'local': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`Order Uber`, `Order MyTaxi`]),
    'remote': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`Choose seats`, `Add luggage`, `Switch to comfort class`]),
    'local&remote': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`Rent a car`, `Book ride`, `Rent a bike`])
  },
  'StopPlace': {
    'stay': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`Add breakfast`, `Add extra bed`, `Add late check-in`]),
    'visit': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`Add ticket`, `Add excursion`, `Add guide`]),
    'eat': createObjectFromArrayWithData(UNIQUE_TRAVEL_ROUTE_MAP, [`Add reservation`, `Add preorder`])
  }
};
export {INPUT_TRAVEL_ROUTE_MAP, EVENTS_ARRAY_MAP, DESTINATIONS_MAP, SPECIAL_OFFERS_MAP};