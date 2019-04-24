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

const SuccessStatusCode = {
  MAX: 300,
  MIN: 200
};

const FilterItems = [
  {
    name: `Everything`,
    filterFunction(points) {
      return points;
    }
  },
  {
    name: `Future`,
    filterFunction(points = []) {
      return points.filter((point) => point && point.startTime > Date.now());
    }
  },
  {
    name: `Past`,
    filterFunction(points = []) {
      return points.filter((point) => point && point.startTime <= Date.now());
    }
  }
];

const SortingItems = [
  {
    name: `Event`,
    sortFunction(points) {
      return points;
    }
  },
  {
    name: `Time`,
    sortFunction(points = []) {
      return points.sort((first, second) => {
        return first.endTime - first.startTime - second.endTime - second.startTime;
      });
    }
  },
  {
    name: `Price`,
    sortFunction(points = []) {
      return points.sort((first, second) => {
        const firstTotal = first.offers.reduce((result, offer) => {
          return offer[`accepted`] ? +offer[`price`] + result : result;
        }, +first.price);
        const secondTotal = second.offers.reduce((result, offer) => {
          return offer[`accepted`] ? +offer[`price`] + result : result;
        }, +first.price);

        return firstTotal - secondTotal;
      });
    }
  }
];

export {Time, Method, Currency, Event, KeyCode, SuccessStatusCode, FilterItems};
