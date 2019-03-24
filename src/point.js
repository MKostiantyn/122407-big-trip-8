import {convertMillisecondsToHours} from './helpers/convert-milliseconds-to-hours';
import {formatHours} from './helpers/format-hours';
import {formatTimeFromMilliseconds} from './helpers/format-time-from-milliseconds';
import {convertPriceToEuro} from './helpers/convert-price-to-euro';
import {createDomElement} from './helpers/create-dom-element';
import {currencySymbol} from './helpers/currency-data';

export class Point {
  constructor(data) {
    this._event = data.event;
    this._price = data.price;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._destination = data.destination;
    this._offers = data.offersChosen;
    this._element = null;
    this._onEdit = null;
  }
  _onPointClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }
  _getTimeTable() {
    return this._endTime ? formatTimeFromMilliseconds(this._startTime, this._endTime) : formatTimeFromMilliseconds(this._startTime);
  }
  _getPointTotalPrice() {
    const conditionalUnitsTotalPrice = this._offers.reduce((accumulator, value) => {
      return (+accumulator) + (+value.price);
    }, this._price);
    return `${currencySymbol} ${convertPriceToEuro(conditionalUnitsTotalPrice)}`;
  }
  _renderPointOffers() {
    return this._offers.reduce((accumulator, item, index, array) => {
      if (!index) {
        accumulator += `<ul class="trip-point__offers">`;
      }
      accumulator += `<li><button class="trip-point__offer">${currencySymbol} ${convertPriceToEuro(item.price)} ${item.title}</button></li>`;
      if (index === array.length - 1) {
        accumulator += `</ul>`;
      }
      return accumulator;
    }, ``);
  }
  set onEdit(fn) {
    this._onEdit = fn;
  }
  get element() {
    return this._element;
  }
  get template() {
    const timetable = this._getTimeTable();
    const duration = this._endTime ? formatHours(convertMillisecondsToHours(this._endTime - this._startTime)) : ``;
    const price = this._getPointTotalPrice();
    const offers = this._renderPointOffers();
    return `<article class="trip-point">
            <i class="trip-icon">${this._event.icon}</i>
            <h3 class="trip-point__title">${this._event.title} ${this._destination.title}</h3>
            <p class="trip-point__schedule">
              <span class="trip-point__timetable">${timetable}</span>
              <span class="trip-point__duration">${duration}</span>
            </p>
            <p class="trip-point__price">${price}</p>
            ${offers}
          </article>`.trim();
  }
  render() {
    this._element = createDomElement(this.template);
    this.bind();
    return this._element;
  }
  unrender() {
    this.unbind();
    this._element = null;
  }
  bind() {
    this._element.addEventListener(`click`, this._onPointClick.bind(this));
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }
}
