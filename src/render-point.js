import getPointTotalPrice from './get-point-total-price';
import renderPointOffers from './render-point-offers';
import renderPointTimetable from './render-point-timetable';
import convertMillisecondsToHours from './helpers/convert-milliseconds-to-hours';
import formatHours from './helpers/format-hours';

export default (data = {}) => {
  const pointData = {
    icon: data.hasOwnProperty(`event`) ? data.event.icon : ``,
    title: data.hasOwnProperty(`event`) && data.hasOwnProperty(`place`) ? `${data.event.title} ${data.place}` : ``,
    timetable: data.hasOwnProperty(`startTime`) ? renderPointTimetable(data.startTime, data.endTime) : ``,
    duration: data.hasOwnProperty(`duration`) && data.duration ? `<span class="trip-point__duration">${formatHours(convertMillisecondsToHours(data.duration))}</span>` : ``,
    price: data.hasOwnProperty(`price`) ? getPointTotalPrice(data.price, data.offers) : ``,
    offers: data.hasOwnProperty(`offers`) ? renderPointOffers(data.offers) : ``
  };
  return `<article class="trip-point">
            <i class="trip-icon">${pointData.icon}</i>
            <h3 class="trip-point__title">${pointData.title}</h3>
            <p class="trip-point__schedule">
              ${pointData.timetable}
              ${pointData.duration}
            </p>
            <p class="trip-point__price">${pointData.price}</p>
            ${pointData.offers}
          </article>`;
};
