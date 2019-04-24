import {Currency, Event} from "./helpers/utils-data";
import {
  convertPriceToCurrency,
  convertMillisecondsToHours,
  formatHours, objectDeepCopying
} from "./helpers/utils-actions";
import {AbstractPoint} from "./abstract-point-component";
import moment from "moment";

export class Point extends AbstractPoint {
  constructor(data) {
    super(data);
    this._onEdit = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  _getTimeTable() {
    const startTimeFormatted = moment(this._startTime).format(`HH:mm`);
    const endTimeFormatted = this._endTime ? moment(this._endTime).format(`HH:mm`) : ``;
    if (endTimeFormatted) {
      return `${startTimeFormatted} - ${endTimeFormatted}`;
    }
    return startTimeFormatted;
  }

  _onPointClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  _renderPointOffers() {
    const VISIBLE_OFFERS = 3;
    const offersChosen = this._getChosenOffers().slice(0, VISIBLE_OFFERS);
    return offersChosen.reduce((total, offer, currentIndex, self) => {
      if (!currentIndex) {
        total += `<ul class="trip-point__offers">`;
      }
      total += `<li><button class="trip-point__offer">${Currency.SYMBOL} ${convertPriceToCurrency(offer.price)} ${offer.title}</button></li>`;
      if (currentIndex === self.length - 1) {
        total += `</ul>`;
      }
      return total;
    }, ``);
  }

  _getDurationTime() {
    const duration = this._endTime - this._startTime;
    const convertedDuration = convertMillisecondsToHours(duration);
    return formatHours(convertedDuration);
  }

  _getChosenOffers() {
    const offers = this._offers;
    return Array.isArray(offers) && offers.length ? offers.filter((item) => item.hasOwnProperty(`accepted`) && item[`accepted`]) : [];
  }

  _getPointTotalPrice() {
    return this._getChosenOffers().reduce((accumulator, item) => +item.price + accumulator, +this._price);
  }

  set onEdit(functionOnEdit) {
    this._onEdit = functionOnEdit;
  }

  get template() {
    const eventObject = Event[this._event];
    const eventTitle = eventObject[`title`];
    const eventIcon = eventObject[`icon`];
    const destinationName = this._destination[`name`];
    const timetable = this._getTimeTable();
    const duration = this._getDurationTime();
    const totalPriceUnits = this._getPointTotalPrice();
    const totalPrice = `${Currency.SYMBOL} ${convertPriceToCurrency(totalPriceUnits)}`;
    const offers = this._renderPointOffers();
    return `<article class="trip-point">
            <i class="trip-icon">${eventIcon}</i>
            <h3 class="trip-point__title">${eventTitle} ${destinationName}</h3>
            <p class="trip-point__schedule">
              <span class="trip-point__timetable">${timetable}</span>
              <span class="trip-point__duration">${duration}</span>
            </p>
            <p class="trip-point__price">${totalPrice}</p>
            ${offers}
          </article>`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }
}
