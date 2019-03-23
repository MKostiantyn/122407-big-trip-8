import renderFilters from './render-filters';
import renderPoints from './render-points';
import getRandomInteger from './helpers/get-random-integer';
import getPointsArray from './get-points-array';

const POINT_QUANTITY = 7;
const FILTER_ITEMS_ARRAY = [`Everything`, `Future`, `Past`];
const filtersForm = document.querySelector(`.trip-filter`);
const tripDayItemsBlock = document.querySelector(`.trip-day__items`);
const pointsArray = getPointsArray(POINT_QUANTITY);

filtersForm.innerHTML = renderFilters(FILTER_ITEMS_ARRAY);
tripDayItemsBlock.innerHTML = renderPoints(pointsArray);

const filters = filtersForm.querySelectorAll(`[name='filter']`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      const randomPointsQuantity = getRandomInteger(1, 10);
      const randomPointsArray = getPointsArray(randomPointsQuantity);
      tripDayItemsBlock.innerHTML = renderPoints(randomPointsArray);
    });
  });
}
