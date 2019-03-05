export default (filterNamesArray) => {
  const templateFilter = (name, index) => `<input type="radio" id="filter-${name.toLowerCase()}" name="filter" value="${name.toLowerCase()}" ${!index ? `checked` : ``}>
                                    <label class="trip-filter__item" for="filter-${name.toLowerCase()}">${name}</label>`;
  return filterNamesArray.reduce((currentValue, currentElement, index) => currentValue + templateFilter(currentElement, index), ``);
};
