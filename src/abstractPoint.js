import {createDomElement} from "./helpers/create-dom-element";
import {formatTimeFromMilliseconds} from "./helpers/format-time-from-milliseconds";

export class AbstractPoint {
  constructor() {
    if (new.target === AbstractPoint) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._events = false;
    this._destinations = false;
    this._offers = false;
    this._endTime = 0;
    this._startTime = 0;
    this._price = 0;
  }
  get template() {
    throw new Error(`You have to define template.`);
  }
  get element() {
    return this._element;
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
  bind() {}
  unbind() {}
  _getChosenEvent() {
    return Array.isArray(this._events) ? this._events.find((item) => typeof item === `object` && item[`isChosen`]) : {};
  }
  _getChosenEventType() {
    const event = this._getChosenEvent();
    return typeof event === `object` && event.hasOwnProperty(`type`) ? event[`type`] : ``;
  }
  _getChosenEventSubType() {
    const event = this._getChosenEvent();
    return typeof event === `object` && event.hasOwnProperty(`subtype`) ? event[`subtype`] : ``;
  }
  _getAvailableDestination() {
    const type = this._getChosenEventType();
    const subtype = this._getChosenEventSubType();
    const destinations = typeof this._destinations === `object` ? this._destinations : {};
    const isExistTypeSubtype = destinations.hasOwnProperty(type) && destinations[type].hasOwnProperty(subtype);
    return isExistTypeSubtype && Array.isArray(destinations[type][subtype]) ? destinations[type][subtype] : [];
  }
  _getChosenDestination() {
    const destinations = this._getAvailableDestination();
    return Array.isArray(destinations) && destinations.length ? destinations.find((item) => item.hasOwnProperty(`isChosen`) && item[`isChosen`]) : {};
  }
  _getAvailableOffers() {
    const type = this._getChosenEventType();
    const subtype = this._getChosenEventSubType();
    const offers = typeof this._offers === `object` ? this._offers : {};
    const isExistTypeSubtype = offers.hasOwnProperty(type) && offers[type].hasOwnProperty(subtype);
    return isExistTypeSubtype && Array.isArray(offers[type][subtype]) ? offers[type][subtype] : [];
  }
  _getChosenOffers() {
    const offers = this._getAvailableOffers();
    return Array.isArray(offers) && offers.length ? offers.filter((item) => item.hasOwnProperty(`isChosen`) && item[`isChosen`]) : [];
  }
  _getTimeTable() {
    return this._endTime ? formatTimeFromMilliseconds(this._startTime, this._endTime) : formatTimeFromMilliseconds(this._startTime);
  }
  _getPointTotalPrice() {
    const offersChosen = this._getChosenOffers();
    return offersChosen.reduce((accumulator, item) => {
      return +item.price + accumulator;
    }, +this._price);
  }
}