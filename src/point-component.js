import {convertMillisecondsToHours} from "./helpers/convert-milliseconds-to-hours";
import {formatHours} from "./helpers/format-hours";
import {convertPriceToCurrency} from "./helpers/convert-price-to-currency";
import {CURRENCY_DATA as currency} from "./helpers/currency-data";
import {AbstractPoint} from "./abstract-point-component";

export class Point extends AbstractPoint {
  constructor(data) {
    super(data);
    this._element = null;
    this._onEdit = null;
  }
  _onPointClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }
  _getChosenDestinationTitle() {
    const destination = this._getChosenDestination();
    return destination && destination.hasOwnProperty(`title`) ? destination.title : ``;
  }
  _renderPointOffers() {
    const offersChosen = this._getChosenOffers();
    return offersChosen.reduce((total, offer, currentIndex, self) => {
      if (!currentIndex) {
        total += `<ul class="trip-point__offers">`;
      }
      total += `<li><button class="trip-point__offer">${currency.symbol} ${convertPriceToCurrency(offer.price)} ${offer.title}</button></li>`;
      if (currentIndex === self.length - 1) {
        total += `</ul>`;
      }
      return total;
    }, ``);
  }
  set onEdit(functionOnEdit) {
    this._onEdit = functionOnEdit;
  }
  get template() {
    const event = this._getChosenEvent();
    const eventIcon = typeof event === `object` ? event.icon : false;
    const eventTitle = typeof event === `object` ? event.title : false;
    const destinationTitle = this._getChosenDestinationTitle();
    const timetable = this._getTimeTable();
    const duration = this._endTime ? formatHours(convertMillisecondsToHours(this._endTime - this._startTime)) : ``;
    const price = `${currency.symbol} ${convertPriceToCurrency(this._getPointTotalPrice())}`;
    const offers = this._renderPointOffers();
    return `<article class="trip-point">
            <i class="trip-icon">${eventIcon}</i>
            <h3 class="trip-point__title">${eventTitle} ${destinationTitle}</h3>
            <p class="trip-point__schedule">
              <span class="trip-point__timetable">${timetable}</span>
              <span class="trip-point__duration">${duration}</span>
            </p>
            <p class="trip-point__price">${price}</p>
            ${offers}
          </article>`.trim();
  }
  bind() {
    this._element.addEventListener(`click`, this._onPointClick.bind(this));
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }
}
