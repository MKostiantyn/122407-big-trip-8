import {AbstractComponent} from "./abstract-component";

export class Filter extends AbstractComponent {
  constructor(data) {
    super(data);
    this._isChecked = data.isChecked;
    this._onChange = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  set onChange(functionOnFilter) {
    this._onChange = functionOnFilter;
  }

  get template() {
    const name = this._name;
    const attributeChecked = this._isChecked ? `checked` : ``;
    return `<span><input type="radio" id="filter-${name.toLowerCase()}" name="filter" value="${name.toLowerCase()}" ${attributeChecked}>
            <label class="trip-filter__item" for="filter-${name.toLowerCase()}">${name}</label></span>`;
  }

  _onFilterChange() {
    if (typeof this._onChange === `function`) {
      this._onChange();
    }
  }

  bind() {
    const filter = this._element;
    const filterInput = filter.querySelector(`[name="filter"]`);
    filterInput.addEventListener(`change`, this._onFilterChange);
  }

  unbind() {
    const filter = this._element;
    const filterInput = filter.querySelector(`[name="filter"]`);
    filterInput.removeEventListener(`change`, this._onFilterChange);
  }
}
