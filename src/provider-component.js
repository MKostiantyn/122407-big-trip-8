import {objectDeepCopying} from "./helpers/utils-actions";
import {PointModel} from "./point-model-component";

export class Provider {
  constructor() {
    this._points = null;
    this._offers = null;
    this._destinations = null;
    this._activeFilter = null;
  }

  get points() {
    return this._points;
  }

  set points(newPoints) {
    this._points = objectDeepCopying(newPoints);
  }

  get offers() {
    return this._offers;
  }

  set offers(newOffers) {
    this._offers = objectDeepCopying(newOffers);
  }

  get destinations() {
    return this._destinations;
  }

  set destinations(newDestinations) {
    this._destinations = objectDeepCopying(newDestinations);
  }

  get activeFilter() {
    return this._activeFilter;
  }

  set activeFilter(newActiveFilter) {
    this._activeFilter = newActiveFilter;
  }

  updateParticularPoint(updatedPoint) {
    const points = this._points;
    if (this._points) {
      const pointIndex = points.findIndex((point) => point.id === updatedPoint.id);
      points[pointIndex] = PointModel.parsePoint(updatedPoint);
    }
  }
}
