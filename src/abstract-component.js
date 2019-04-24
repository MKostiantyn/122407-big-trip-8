import {createDomElement} from "./helpers/utils-actions";

export class AbstractComponent {
  constructor(data) {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._name = data.name;
  }

  get template() {
    throw new Error(`You have to define template.`);
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
