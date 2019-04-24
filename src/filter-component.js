import {AbstractFilter} from "./abstract-filter-component";

export class Filter extends AbstractFilter {
  constructor(data) {
    super(data);
    this._isChecked = data.isChecked;
    this._onFilter = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  set onFilter(functionOnFilter) {
    this._onFilter = functionOnFilter;
  }

  get template() {
    const name = this._name;
    const attributeChecked = this._isChecked ? `checked` : ``;
    return `<span><input type="radio" id="filter-${name.toLowerCase()}" name="filter" value="${name.toLowerCase()}" ${attributeChecked}>
            <label class="trip-filter__item" for="filter-${name.toLowerCase()}">${name}</label></span>`;
  }

  _onFilterChange() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
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
