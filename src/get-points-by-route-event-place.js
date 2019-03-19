import getRandomInteger from './helpers/get-random-integer';
import getRandomTime from './helpers/get-random-time';
import getRandomArrayElements from './helpers/get-random-array-elements';
import getFormattedTime from './helpers/get-formatted-time';
import getRandomDescription from './helpers/get-random-description';
import convertHoursToMilliseconds from './helpers/convert-hours-to-milliseconds';

export default (
    cities = [],
    events = [],
    offersMap = new Map(),
    picturesArray = [],
    quantity = 0
) => {
  return [...new Array(quantity)].map(() => {
    const city = cities[getRandomInteger(0, cities.length - 1)];
    const event = events[getRandomInteger(0, events.length - 1)];
    const statusEventTypeTransport = event.type === `Transport`;
    const id = `${city} - ${event.id}`;
    const isFavorite = Math.random() > 0.5;
    const price = getRandomInteger(1, 10);
    const randomTime = new Date(getRandomTime());
    const startTime = getFormattedTime(randomTime);
    const duration = statusEventTypeTransport ? convertHoursToMilliseconds(getRandomInteger(1, 3)) : false;
    const endTime = statusEventTypeTransport ? getFormattedTime(new Date(randomTime.getTime() + duration)) : false;
    const pictures = statusEventTypeTransport ? getRandomArrayElements(picturesArray, 1, picturesArray.length) : false;
    const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
    const description = statusEventTypeTransport ? getRandomDescription(descriptionText) : false;
    const offers = offersMap.get(id);
    const place = event.place[getRandomInteger(0, event.place.length - 1)];

    return {
      city,
      event,
      id,
      isFavorite,
      price,
      startTime,
      duration,
      endTime,
      pictures,
      description,
      offers,
      place
    };
  });
};
