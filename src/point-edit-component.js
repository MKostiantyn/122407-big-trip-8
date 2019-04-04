import {CURRENCY_DATA as currency} from "./helpers/currency-data";
import {AbstractPoint} from "./abstract-point-component";
import moment from "moment";
import {convertPriceToCurrency} from "./helpers/convert-price-to-currency";
import {convertPriceFromCurrency} from "./helpers/convert-price-from-currency";
import {getInitialDataByPlace} from "./get-initial-data-by-place";
import {convertNumberToPriceFormat} from "./helpers/convert-number-to-price-format";
import {removeDomElement} from "./helpers/remove-dom-element";
import {createDomElement} from "./helpers/create-dom-element";

export class PointEdit extends AbstractPoint {
  constructor(data) {
    super(data);
    console.log(data);
    this._element = null;

    this._onSubmit = null;
    this._onReset = null;

    this._onSubmitForm = this._onSubmitForm.bind(this);
    this._onResetClick = this._onResetClick.bind(this);
    this._onChangeEvent = this._onChangeEvent.bind(this);
  }
  _onSubmitForm(event) {
    event.preventDefault();

    const formElement = this._element.querySelector(`[data-point-form]`);
    const formData = new FormData(formElement);
    const newFormData = this._processFormData(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newFormData);
    }
    this.update(newFormData);
  }
  _processFormData(data) {
    const formData = {};
    for (const pair of data.entries()) {
      const [property, value] = pair;
      if (formData.hasOwnProperty(property)) {
        formData[property] = `${formData[property]},${value}`;
      } else {
        formData[property] = value;
      }
    }
    return this._updateDataByFormData(formData);
  }
  _onResetClick(event) {
    event.preventDefault();
    if (typeof this._onReset === `function`) {
      this._onReset();
    }
  }
  _onChangeEvent(event) {
    this._toggleEventList();
    const newData = this._updateDataByChosenEvent(event.target.value);
    this.update(newData);
    this.unbind();
    this._partialUpdate();
    this.bind();
  }
  _partialUpdate() {
    const domPoint = createDomElement(this.template);
    const pointsParent = this._element.parentNode;
    pointsParent.replaceChild(domPoint, this._element);
    this._element = domPoint;
  }
  _updateDataByChosenEvent(event) {
    const defaultData = getInitialDataByPlace(this._place);
    defaultData[`events`].forEach((item) => {
      item[`isChosen`] = event === item[`id`];
    });
    return defaultData;
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
      const eventStatus = isEventObject && event.hasOwnProperty(`isChosen`) ? event[`isChosen`] : false;
      const inputCheckedAttribute = eventStatus ? `checked` : ``;
      const labelText = `${eventIcon} ${eventId}`;
      const inputId = `travel-way-${eventId.toLowerCase().replace(/ /g, `-`)}`;
      return `<input class="travel-way__select-input visually-hidden" type="radio" id="${inputId}" name="travel-way" value="${eventId}" ${inputCheckedAttribute}>
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
      const price = isOfferObject && offer.hasOwnProperty(`price`) ? convertPriceToCurrency(offer.price) : 0;
      const isChosen = isOfferObject && offer.hasOwnProperty(`isChosen`) && offer[`isChosen`] ? `checked` : ``;
      const id = isOfferObject && offer.hasOwnProperty(`id`) ? offer[`id`] : ``;
      const title = isOfferObject && offer.hasOwnProperty(`title`) ? offer[`title`] : ``;
      return `<input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="${id}" ${isChosen}>
              <label for="${id}" class="point__offers-label">
                <span class="point__offer-service">${title}</span> + ${currency.symbol}<span class="point__offer-price">${price}</span>
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
  _updateDataByFormData(formData) {
    const defaultData = getInitialDataByPlace(this._place);
    const chosenEvent = defaultData[`events`].find((item) => {
      if (item[`id`] === formData[`travel-way`]) {
        item[`isChosen`] = true;
        return true;
      }
      return false;
    });
    const eventChosenType = chosenEvent[`type`];
    const eventChosenSubtype = chosenEvent[`subtype`];
    const chosenOffers = formData.hasOwnProperty(`offer`) ? formData[`offer`].split(`,`) : [];
    const [startTime, endTime] = formData[`time`].split(`-`);
    const isNextDay = endTime && parseFloat(startTime.trim()) > parseFloat(endTime.trim());
    const day = formData[`day`];
    const nextDay = isNextDay ? moment(day, `MMM DD`).add(1, `days`).format(`MMM DD`) : null;
    const formattedStartTime = moment(`${day} ${startTime.trim()}`, `MMM DD HH:mm`);
    const formattedEndTime = endTime ? moment(`${isNextDay ? nextDay : day} ${endTime.trim()}`, `MMM DD HH:mm`) : null;
    const price = convertPriceFromCurrency(formData[`price`]);
    const formattedPrice = convertNumberToPriceFormat(price);
    defaultData[`destinations`][eventChosenType][eventChosenSubtype].find((item) => {
      if (item[`title`] === formData[`destination`]) {
        item[`isChosen`] = true;
        return true;
      }
      return false;
    });
    defaultData[`offers`][eventChosenType][eventChosenSubtype].forEach((item) => {
      if (chosenOffers.includes(item[`id`])) {
        item[`isChosen`] = true;
        return true;
      }
      return false;
    });
    defaultData[`price`] = formattedPrice;
    defaultData[`startTime`] = formattedStartTime;
    defaultData[`endTime`] = formattedEndTime;
    return defaultData;
  }
  _toggleEventList() {
    const inputToggle = this._element.querySelector(`[id="travel-way__toggle"]`);
    inputToggle.checked = !inputToggle.checked;
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
    const day = this._startTime ? moment(this._startTime).format(`MMM DD`).toUpperCase() : ``;
    const timeTable = this._getTimeTable();
    const price = convertPriceToCurrency(this._price);
    const totalPrice = `${convertPriceToCurrency(this._getPointTotalPrice())}`;
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;
    const offers = this._renderOffers();
    const description = this._renderChosenDestinationDescription();
    const pictures = this._renderPictures();
    return `<article class="point">
              <form action="" method="get" data-point-form>
                <header class="point__header">
                  <label class="point__date">
                    choose day
                    <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${day}">
                  </label>
                  <div class="travel-way">${chosenEvent}<div class="travel-way__select">${availableEvents}</div></div>
                  <div class="point__destination-wrap">${chosenDestination}${availableDestination}</div>
                  <label class="point__time">choose time
                    <input class="point__input" type="text" value="${timeTable}" name="time" placeholder="00:00 — 00:00">
                  </label>
                  <label class="point__price">write price
                    <span class="point__price-currency">${currency.symbol}</span>
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
    const eventInputs = formElement.querySelectorAll(`[name="travel-way"]`);
    eventInputs.forEach((item) => item.addEventListener(`change`, this._onChangeEvent));
    formElement.addEventListener(`submit`, this._onSubmitForm);
    formElement.addEventListener(`reset`, this._onResetClick);
  }
  unbind() {
    const formElement = this._element.querySelector(`[data-point-form]`);
    const eventInputs = formElement.querySelectorAll(`[name="travel-way"]`);
    eventInputs.forEach((item) => item.removeEventListener(`change`, this._onChangeEvent));
    formElement.removeEventListener(`submit`, this._onSubmitForm);
    formElement.removeEventListener(`reset`, this._onResetClick);
  }
}
