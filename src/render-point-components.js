import {Point} from "./point-component";
import {PointEdit} from "./point-edit-component";
import {PointModel} from "./point-model-component";
import {removeAllChildrenFromElement} from "./helpers/utils-actions";

export const renderPointComponents = (data, container, serverApi) => {
  const points = data.points;
  const offersAvailable = data.offers;
  const destinationsAvailable = data.destinations;
  removeAllChildrenFromElement(container);
  points.forEach((item) => {
    const point = new Point(item);
    const pointEdit = new PointEdit(item, destinationsAvailable, offersAvailable);
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
          const parsedData = PointModel.parsePoint(updatedData);
          point.update(parsedData);
          point.render();
          container.replaceChild(point.element, pointEdit.element);
          pointEdit.unrender();
          pointEdit.update(parsedData);
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
          pointEdit.toggleBlockingOnDelete(false);
          renderPointComponents({
            points: pointsUpdated,
            offers: offersAvailable,
            destinations: destinationsAvailable
          }, container, serverApi);
        })
        .catch((error) => {
          pointEdit.toggleBlockingOnDelete(false);
          pointEdit.toggleErrorResponse(true);
          throw error;
        });
    };
  });
};
