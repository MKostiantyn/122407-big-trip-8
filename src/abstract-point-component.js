import {createDomElement} from "./helpers/create-dom-element";
import {objectDeepCopying} from "./helpers/object-deep-copying";
import moment from "moment";

export class AbstractPoint {
  constructor(data) {
    if (new.target === AbstractPoint) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._events = objectDeepCopying(data.events);
    this._destinations = objectDeepCopying(data.destinations);
    this._offers = objectDeepCopying(data.offers);
    this._price = data.price;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._place = data.place;
    this._isFavorite = data.isFavorite;
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
  update(data) {
    this._events = objectDeepCopying(data.events);
    this._destinations = objectDeepCopying(data.destinations);
    this._offers = objectDeepCopying(data.offers);
    this._price = data.price;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._isFavorite = data.isFavorite;
  }
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
    if (this._endTime && this._startTime && !isNaN(this._endTime) && !isNaN(this._startTime)) {
      return `${moment(this._startTime).format(`HH:mm`)} - ${moment(this._endTime).format(`HH:mm`)}`
    }
    return !isNaN(this._startTime) && this._startTime ? moment(this._startTime).format(`HH:mm`) : ``;
  }
  _getPointTotalPrice() {
    const offersChosen = this._getChosenOffers();
    return offersChosen.reduce((accumulator, item) => {
      return +item.price + accumulator;
    }, +this._price);
  }
}