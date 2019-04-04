import {INPUT_TRAVEL_ROUTE_MOCK} from "./initial-data";
class CurrentRouteData {
  constructor(route) {
    this._data = [];
    this._route = Array.isArray(route) ? route : [];
  }
  get place() {
    if (!this._data.length) {
      this._data.push(this._route[0]);
    }
    return this._data[this._data.length - 1];
  }
  addPlace(place) {
    if (typeof place === `string` && place.length) {
      this._data.push(place);
    }
  }
  deletePlace() {
    if (this._data.length) {
      this._data.pop();
    }
  }
}
const currentRouteData = new CurrentRouteData(INPUT_TRAVEL_ROUTE_MOCK);
export {currentRouteData};
