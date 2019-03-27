import {convertPriceToEuro} from "./helpers/convert-price-to-euro";
import {currencySymbol} from "./helpers/currency-data";
import {AbstractPoint} from "./abstractPoint";

export class PointEdit extends AbstractPoint {
  constructor(data) {
    super();
    this._events = data.events;
    this._price = data.price;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._destinations = data.destinations;
    this._offers = data.offers;
    this._isFavorite = data.isFavorite;
    this._element = null;
    this._onSubmit = null;
    this._onReset = null;
  }
  _onSubmitClick(event) {
    event.preventDefault();
    typeof this._onSubmit === `function` && this._onSubmit();
  }
  _onResetClick(event) {
    event.preventDefault();
    typeof this._onReset === `function` && this._onReset();
  }
  _renderChosenEvent() {
    const chosenEvent = this._getChosenEvent();
    const icon = typeof chosenEvent === `object` && chosenEvent.hasOwnProperty(`icon`) ? chosenEvent.icon : ``;
    return `<label class="travel-way__label" for="travel-way__toggle">${icon}</label>
            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">`;
  }
  _renderAvailableEvents() {
    const events = this._events;
    const isEventArray = Array.isArray(events);
    const transportGroupArray = isEventArray ? events.filter((item) => item.type === `Transport`) : [];
    const stopPlaceGroupArray = isEventArray ? events.filter((item) => item.type === `StopPlace`) : [];
    const getTemplateEvent = (event) => {
      const isEventObject = typeof event === `object`;
      const eventId = isEventObject && event.hasOwnProperty(`id`) ? event[`id`] : ``;
      const eventIcon = isEventObject && event.hasOwnProperty(`icon`) ? event[`icon`] : ``;
      const labelText = `${eventIcon} ${eventId}`;
      const inputId = `travel-way-${eventId}`;
      return `<input class="travel-way__select-input visually-hidden" type="radio" id="${inputId}" name="travel-way" value="${eventId}">
              <label class="travel-way__select-label" for="${inputId}">${labelText}</label>`;
    };
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
    const chosenEvent = this._getChosenEvent();
    const chosenDestination = this._getChosenDestination();
    const titleEvent = typeof chosenEvent === `object` && chosenEvent.hasOwnProperty(`title`) ? chosenEvent[`title`] : ``;
    const titleDestination = typeof chosenDestination === `object` && chosenDestination.hasOwnProperty(`title`) ? chosenDestination[`title`] : ``;
    return `<label class="point__destination-label" for="destination">${titleEvent}</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${titleDestination}" name="destination">`;
  }
  _renderAvailableDestination() {
    const destinations = this._getAvailableDestination();
    return destinations.reduce((accumulator, item, index, array) => {
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
    const offers = this._getAvailableOffers();
    const getOfferTemplate = (offer) => {
      const isOfferObject = typeof offer === `object`;
      const price = isOfferObject && offer.hasOwnProperty(`price`) ? convertPriceToEuro(offer.price) : 0;
      const isChosen = isOfferObject && offer.hasOwnProperty(`isChosen`) && offer[`isChosen`] ? `checked` : ``;
      const id = isOfferObject && offer.hasOwnProperty(`id`) ? offer[`id`] : ``;
      const title = isOfferObject && offer.hasOwnProperty(`title`) ? offer[`title`] : ``;
      return `<input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="${id}" ${isChosen}>
              <label for="${id}" class="point__offers-label">
                <span class="point__offer-service">${title}</span> + ${currencySymbol}<span class="point__offer-price">${price}</span>
              </label>`;
    };
    return offers.reduce((accumulator, item, index, array) => {
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
  _renderChosenDestinationDescription() {
    const destination = this._getChosenDestination();
    const description = typeof destination === `object` && destination.hasOwnProperty(`description`) ? destination[`description`] : ``;
    return `<p class="point__destination-text">${description}</p>`;
  }
  _renderPictures() {
    const destination = this._getChosenDestination();
    const pictures = typeof destination === `object` && destination.hasOwnProperty(`pictures`) && Array.isArray(destination[`pictures`]) ? destination[`pictures`] : [];
    return pictures.reduce((accumulator, item, index, array) => {
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
  set onSubmit(functionOnSubmit) {
    this._onSubmit = functionOnSubmit;
  }
  set onReset(functionOnReset) {
    this._onReset = functionOnReset;
  }
  get template() {
    const chosenEvent = this._renderChosenEvent();
    const availableEvents = this._renderAvailableEvents();
    const chosenDestination = this._renderChosenDestination();
    const availableDestination = this._renderAvailableDestination();
    const timeTable = this._getTimeTable();
    const price = convertPriceToEuro(this._price);
    const totalPrice = `${convertPriceToEuro(this._getPointTotalPrice())}`;
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;
    const offers = this._renderOffers();
    const description = this._renderChosenDestinationDescription();
    const pictures = this._renderPictures();
    return `<article class="point">
              <form action="" method="get" data-point-form>
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
  bind() {
    const formElement = this._element.querySelector(`[data-point-form]`);
    formElement.addEventListener(`submit`, this._onSubmitClick.bind(this));
    formElement.addEventListener(`reset`, this._onResetClick.bind(this));
  }
  unbind() {
    const formElement = this._element.querySelector(`[data-point-form]`);
    formElement.removeEventListener(`submit`, this._onSubmitClick);
    formElement.removeEventListener(`reset`, this._onResetClick);
  }
}
