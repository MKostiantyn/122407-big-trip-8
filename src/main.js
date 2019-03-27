import renderFilters from './render-filters';
import {getRandomInteger} from './helpers/get-random-integer';
import getPointsArray from './get-points-array';
import {Point} from './point';
import {PointEdit} from './pointEdit';

const POINT_QUANTITY = 7;
const FILTER_ITEMS_ARRAY = [`Everything`, `Future`, `Past`];
const filtersForm = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);
const pointsArray = getPointsArray(POINT_QUANTITY);
pointsArray.forEach((item) => {
  const point = new Point(item);
  const pointEdit = new PointEdit(item);
  pointsContainer.appendChild(point.render());
  point.onEdit = () => {
    pointEdit.render();
    pointsContainer.replaceChild(pointEdit.element, point.element);
    point.unrender();
  };
  pointEdit.onSubmit = () => {
    point.render();
    pointsContainer.replaceChild(point.element, pointEdit.element);
    pointEdit.unrender();
  };
  pointEdit.onReset = () => {
    point.render();
    pointsContainer.replaceChild(point.element, pointEdit.element);
    pointEdit.unrender();
  };
});
filtersForm.innerHTML = renderFilters(FILTER_ITEMS_ARRAY);

const filters = filtersForm.querySelectorAll(`[name='filter']`);
if (filters.length) {
  filters.forEach((filter) => {
    filter.addEventListener(`change`, () => {
      while (pointsContainer.firstChild) {
        pointsContainer.removeChild(pointsContainer.firstChild);
      }
      const randomPointsQuantity = getRandomInteger(1, 10);
      const randomPointsArray = getPointsArray(randomPointsQuantity);
      randomPointsArray.forEach((item) => {
        const point = new Point(item);
        const pointEdit = new PointEdit(item);
        pointsContainer.appendChild(point.render());
        point.onEdit = () => {
          pointEdit.render();
          pointsContainer.replaceChild(pointEdit.element, point.element);
          point.unrender();
        };
        pointEdit.onSubmit = () => {
          point.render();
          pointsContainer.replaceChild(point.element, pointEdit.element);
          pointEdit.unrender();
        };
        pointEdit.onDelete = () => {
          point.render();
          pointsContainer.replaceChild(point.element, pointEdit.element);
          pointEdit.unrender();
        };
      });
    });
  });
}
