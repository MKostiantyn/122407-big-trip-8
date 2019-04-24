import {Point} from "./point-component";
import {PointEdit} from "./point-edit-component";
import {removeAllChildrenFromElement} from "./helpers/utils-actions";

export const renderPoints = (provider, container, serverApi) => {
  const activeFilter = provider.activeFilter;
  const points = activeFilter && activeFilter.hasOwnProperty(`filterFunction`) ? activeFilter.filterFunction(provider.points) : provider.points;
  removeAllChildrenFromElement(container);
  points.forEach((item) => {
    const point = new Point(item);
    const pointEdit = new PointEdit(item, provider);
    container.appendChild(point.render());
    point.onEdit = () => {
      pointEdit.render();
      container.replaceChild(pointEdit.element, point.element);
      point.unrender();
    };
    pointEdit.onExit = () => {
      point.render();
      container.replaceChild(point.element, pointEdit.element);
      pointEdit.unrender();
    };
    pointEdit.onSubmit = (newData) => {
      pointEdit.toggleErrorResponse(false);
      pointEdit.toggleBlockingOnSave(true);
      serverApi.updatePoint({
        id: newData.id,
        data: newData
      })
        .then((updatedData) => {
          pointEdit.toggleBlockingOnSave(false);
          provider.updateParticularPoint(updatedData);
          pointEdit.unrender();
          renderPoints(provider, container, serverApi);
        })
        .catch((error) => {
          pointEdit.toggleBlockingOnSave(false);
          pointEdit.toggleErrorResponse(true);
          throw error;
        });

    };
    pointEdit.onDelete = (id) => {
      pointEdit.toggleErrorResponse(false);
      pointEdit.toggleBlockingOnDelete(true);
      serverApi.deletePoint({id})
        .then(() => {
          return serverApi.getPoints();
        })
        .then((pointsUpdated) => {
          provider.points = pointsUpdated;
          pointEdit.toggleBlockingOnDelete(false);
          pointEdit.unrender();
          renderPoints(provider, container, serverApi);
        })
        .catch((error) => {
          pointEdit.toggleBlockingOnDelete(false);
          pointEdit.toggleErrorResponse(true);
          throw error;
        });
    };
  });
};
