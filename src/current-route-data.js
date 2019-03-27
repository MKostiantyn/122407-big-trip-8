import {INPUT_TRAVEL_ROUTE_MAP} from "./initial-data";
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
const CURRENT_ROUTE_DATA = new CurrentRouteData(INPUT_TRAVEL_ROUTE_MAP);
export {CURRENT_ROUTE_DATA};
