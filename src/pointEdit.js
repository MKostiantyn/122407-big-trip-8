import {formatTimeFromMilliseconds} from './helpers/format-time-from-milliseconds';
import {convertPriceToEuro} from './helpers/convert-price-to-euro';
import {createDomElement} from "./helpers/create-dom-element";
import {currencySymbol} from './helpers/currency-data';

export class PointEdit {
  constructor(data) {
    this._event = data.event;
    this._events = data.events;
    this._price = data.price;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._destination = data.destination;
    this._destinations = data.destinations;
    this._offers = data.offers;
    this._offersChosen = data.offersChosen;
    this._isFavorite = data.isFavorite;
    this._element = null;
    this._onSubmit = null;
    this._onDelete = null;
  }

  _onSubmitClick(event) {
    event.preventDefault();
    typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onDeleteClick(event) {
    event.preventDefault();
    typeof this._onDelete === `function` && this._onDelete();
  }

  _getTimeTable() {
    return this._endTime ? formatTimeFromMilliseconds(this._startTime, this._endTime) : formatTimeFromMilliseconds(this._startTime);
  }

  _getPointTotalPrice() {
    const conditionalUnitsTotalPrice = this._offersChosen.reduce((accumulator, value) => {
      return (+accumulator) + (+value.price);
    }, this._price);
    return convertPriceToEuro(conditionalUnitsTotalPrice);
  }

  _renderChosenEvent() {
    return `<label class="travel-way__label" for="travel-way__toggle">${this._event.icon}</label>
            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">`;
  }

  _renderAvailableEvents() {
    const getTemplateEvent = (event) => {
      const eventId = event.id.toLowerCase();
      const inputId = `travel-way-${eventId}`;
      const labelText = `${event.icon} ${eventId}`;
      return `<input class="travel-way__select-input visually-hidden" type="radio" id="${inputId}" name="travel-way" value="${eventId}">
                <label class="travel-way__select-label" for="${inputId}">${labelText}</label>`;
    };
    const transportGroupArray = this._events.filter((item) => item.type === `Transport`);
    const stopPlaceGroupArray = this._events.filter((item) => item.type === `StopPlace`);
    const renderGroup = (groupArray) => groupArray.reduce((accumulator, item, index, array) => {
      if (!index) {
        accumulator += `<div class="travel-way__select-group">`;
      }
      accumulator += getTemplateEvent(item);
      if (index === array.length - 1) {
        accumulator += `</div>`;
      }
      return accumulator;
    }, ``);
    return `${renderGroup(transportGroupArray)}${renderGroup(stopPlaceGroupArray)}`;
  }

  _renderChosenDestination() {
    return `<label class="point__destination-label" for="destination">${this._event.title}</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination.title}" name="destination">`;
  }

  _renderAvailableDestination() {
    const destinations = this._destinations;
    const eventType = this._event.type;
    const eventSubtype = this._event.subtype;
    const destinationsByTypeEvent = destinations.get(eventType).get(eventSubtype);
    return destinationsByTypeEvent.reduce((accumulator, item, index, array) => {
      if (!index) {
        accumulator += `<datalist id="destination-select">`;
      }
      accumulator += `<option value="${item.title}"></option>`;
      if (index === array.length - 1) {
        accumulator += `</datalist>`;
      }
      return accumulator;
    }, ``);
  }

  _renderOffers() {
    const offersByEvent = this._offers.get(this._event.type).get(this._event.subtype);
    const getOfferTemplate = (offer) => {
      const price = convertPriceToEuro(offer.price);
      const isChosen = this._offersChosen.includes(offer) ? `checked` : ``;
      return `<input class="point__offers-input visually-hidden" type="checkbox" id="${offer.id}" name="offer" value="${offer.id}" ${isChosen}>
              <label for="${offer.id}" class="point__offers-label">
                <span class="point__offer-service">${offer.title}</span> + ${currencySymbol}<span class="point__offer-price">${price}</span>
              </label>`;
    };
    return offersByEvent.reduce((accumulator, item, index, array) => {
      if (!index) {
        accumulator += `<div class="point__offers-wrap">`;
      }
      accumulator += getOfferTemplate(item);
      if (index === array.length - 1) {
        accumulator += `</div>`;
      }
      return accumulator;
    }, ``);
  }

  _renderPictures() {
    return this._destination.pictures.reduce((accumulator, item, index, array) => {
      if (!index) {
        accumulator += `<div class="point__destination-images">`;
      }
      accumulator += `<img src="${item}" alt="picture from place" class="point__destination-image">`;
      if (index === array.length - 1) {
        accumulator += `</div>`;
      }
      return accumulator;
    }, ``);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    const chosenEvent = this._renderChosenEvent();
    const availableEvents = this._renderAvailableEvents();
    const chosenDestination = this._renderChosenDestination();
    const availableDestination = this._renderAvailableDestination();
    const timeTable = this._getTimeTable();
    const price = convertPriceToEuro(this._price);
    const totalPrice = this._getPointTotalPrice();
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;
    const offers = this._renderOffers();
    const description = `<p class="point__destination-text">${this._destination.description}</p>`
    const pictures = this._renderPictures();
    return `<article class="point">
              <form action="" method="get">
                <header class="point__header">
                  <label class="point__date">
                    choose day
                    <input class="point__input" type="text" placeholder="MAR 18" name="day">
                  </label>
                  <div class="travel-way">${chosenEvent}<div class="travel-way__select">${availableEvents}</div></div>
                  <div class="point__destination-wrap">${chosenDestination}${availableDestination}</div>
                  <label class="point__time">choose time
                    <input class="point__input" type="text" value="${timeTable}" name="time" placeholder="${timeTable}">
                  </label>
                  <label class="point__price">write price
                    <span class="point__price-currency">${currencySymbol}</span>
                    <input class="point__input" type="text" value="${price}" name="price">
                  </label>
                  <div class="point__buttons">
                    <button class="point__button point__button--save" type="submit">Save</button>
                    <button class="point__button" type="reset">Delete</button>
                  </div>
                  <div class="paint__favorite-wrap">
                    <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${isFavoriteChecked}>
                    <label class="point__favorite" for="favorite">favorite</label>
                  </div>
                </header>
                <section class="point__details">
                  <section class="point__offers">
                    <h3 class="point__details-title">offers</h3>
                    ${offers}
                  </section>
                  <section class="point__destination">
                    <h3 class="point__details-title">Destination</h3>
                    ${description}
                    ${pictures}
                  </section>
                  <input type="hidden" class="point__total-price" name="total-price" value="${totalPrice}">
                </section>
              </form>
            </article>`;
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
    this._element
      .querySelector(`.point__button.point__button--save`)
      .addEventListener(`click`, this._onSubmitClick.bind(this));
    this._element
      .querySelector(`.point__button:not(.point__button--save)`)
      .addEventListener(`click`, this._onDeleteClick.bind(this));
  }

  unbind() {
    this._element
      .querySelector(`.point__button.point__button--save`)
      .removeEventListener(`click`, this._onSubmitClick);
    this._element
      .querySelector(`.point__button:not(.point__button--save)`)
      .removeEventListener(`click`, this._onDeleteClick);
  }
}
