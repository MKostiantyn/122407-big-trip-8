import renderFilters from "./render-filters";
import {getRandomInteger} from "./helpers/get-random-integer";
import getPointsArray from "./get-points-array";
import {renderPointComponents} from "./render-point-components";
import {removeAllChildrenFromElement} from "./helpers/remove-all-children-from-element";

const POINT_QUANTITY = 7;
const FILTER_ITEMS_ARRAY = [`Everything`, `Future`, `Past`];
const filtersForm = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);
const pointsArray = getPointsArray(POINT_QUANTITY);
pointsArray.forEach((dataItem) => renderPointComponents(dataItem, pointsContainer));
filtersForm.innerHTML = renderFilters(FILTER_ITEMS_ARRAY);

const filters = filtersForm.querySelectorAll(`[name='filter']`);
if (filters && filters.length) {
  filters.forEach((filter) => {
    filter.addEventListener(`change`, () => {
      const randomPointsQuantity = getRandomInteger(1, 10);
      const randomPointsArray = getPointsArray(randomPointsQuantity);
      removeAllChildrenFromElement(pointsContainer);
      randomPointsArray.forEach((dataItem) => renderPointComponents(dataItem, pointsContainer));
    });
  });
}
