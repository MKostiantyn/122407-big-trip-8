import renderFilters from './render-filters';
import renderTripEvents from './render-trip-events';
import getRandomInteger from './helpers/get-random-integer';

const FILTER_ITEMS_ARRAY = [`Everything`, `Future`, `Past`];
const filtersForm = document.querySelector(`.trip-filter`);
const tripDayItemsBlock = document.querySelector(`.trip-day__items`);

filtersForm.innerHTML = renderFilters(FILTER_ITEMS_ARRAY);
tripDayItemsBlock.innerHTML = renderTripEvents(7);

const filters = filtersForm.querySelectorAll(`[name='filter']`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      tripDayItemsBlock.innerHTML = renderTripEvents(getRandomInteger(1, 10));
    });
  });
}
