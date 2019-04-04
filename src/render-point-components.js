import {Point} from "./point-component";
import {PointEdit} from "./point-edit-component";

export const renderPointComponents = (data, container) => {
  const point = new Point(data);
  const pointEdit = new PointEdit(data);
  if (container && container.nodeName) {
    container.appendChild(point.render());
    point.onEdit = () => {
      pointEdit.render();
      container.replaceChild(pointEdit.element, point.element);
      point.unrender();
    };
    pointEdit.onSubmit = (newData) => {
      point.update(newData);
      point.render();
      container.replaceChild(point.element, pointEdit.element);
      pointEdit.unrender();
    };
    pointEdit.onReset = () => {
      point.render();
      container.replaceChild(point.element, pointEdit.element);
      pointEdit.unrender();
    };
  }
};
