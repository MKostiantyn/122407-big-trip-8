import getRandomInteger from './helpers/get-random-integer';
import getRandomTime from './helpers/get-random-time';
import getFormattedTime from './helpers/get-formatted-time';
import getRandomPictures from './helpers/get-random-pictures';
import getRandomDescription from './helpers/get-random-description';
import convertHourToMilliseconds from './helpers/convert-hour-to-milliseconds'

export default (places = [], events = [], offersMap = new Map(), quantity = 0) => {
  return [...new Array(quantity)].map(() => {
    const place = places[getRandomInteger(0, places.length - 1)];
    const event = events[getRandomInteger(0, events.length - 1)];
    const statusEventTypeTransport = event.type === `Transport`;
    const id = `${place} - ${event.id}`;
    const isFavorite = Math.random() > 0.5;
    const price = getRandomInteger(1, 50);
    const randomTime = new Date(getRandomTime());
    const startTime = getFormattedTime(randomTime);
    const duration = statusEventTypeTransport ? convertHourToMilliseconds(getRandomInteger(1, 3)) : false;
    const endTime = statusEventTypeTransport ? getFormattedTime(new Date(randomTime.getTime() + duration)) : false;
    const pictures = statusEventTypeTransport ? getRandomPictures(getRandomInteger(1, 8)) : false;
    const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
    const description = statusEventTypeTransport ? getRandomDescription(descriptionText) : false;
    const offers = offersMap.get(id);

    return {
      event,
      id,
      isFavorite,
      price,
      startTime,
      duration,
      endTime,
      pictures,
      description,
      offers
    };
  });
};
