import {createDomElement} from "./helpers/utils-actions";

export class AbstractFilter {
  constructor(data) {
    if (new.target === AbstractFilter) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._name = data.name;
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