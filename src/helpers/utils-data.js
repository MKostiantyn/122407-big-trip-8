const Time = {
  HOURS: 24,
  MINUTES: 60,
  SECONDS: 60,
  MILLISECONDS: 1000
};

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Currency = {
  SYMBOL: `€`,
  RATE: 1
};

const Event = {
  'taxi': {
    title: `Taxi to`,
    icon: `🚕`,
    type: `action`
  },
  'bus': {
    title: `Bus to`,
    icon: `🚌`,
    type: `action`
  },
  'train': {
    title: `Train to`,
    icon: `🚂`,
    type: `action`
  },
  'ship': {
    title: `Ship to`,
    icon: `🛳️`,
    type: `action`
  },
  'transport': {
    title: `Transport to`,
    icon: `🚊`,
    type: `action`
  },
  'drive': {
    title: `Drive to`,
    icon: `🚗`,
    type: `action`
  },
  'flight': {
    title: `Flight to`,
    icon: `✈️`,
    type: `action`
  },
  'check-in': {
    title: `Check into`,
    icon: `🏨️`,
    type: `stay`
  },
  'sightseeing': {
    title: `Visit`,
    icon: `🏛️`,
    type: `stay`
  },
  'restaurant': {
    title: `Eat in`,
    icon: `🍴`,
    type: `stay`
  }
};

const KeyCode = {
  ESC: 27
};

export {Time, Method, Currency, Event, KeyCode};
