import {objectDeepCopying, createDomElement, renameObjectProperty} from "./helpers/utils-actions";

export class AbstractPoint {
  constructor(data) {
    if (new.target === AbstractPoint) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._event = data.event;
    this._destination = objectDeepCopying(data.destination);
    this._offers = data.offers.reduce((result, offer) => {
      const newOffer = renameObjectProperty(`title`, `name`, offer);
      result.push(newOffer);
      return result;
    }, []);
    this._price = data.price;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
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

  bind() {
  }

  unbind() {
  }
}
