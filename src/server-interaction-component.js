import {Method as methods} from "./helpers/utils-data";
import {PointModel} from "./point-model-component";

export class ServerInteraction {
  constructor({url, authorization}) {
    this._url = url;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(ServerInteraction.toJSON)
      .then(PointModel.parsePoints);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(ServerInteraction.toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(ServerInteraction.toJSON);
  }

  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: methods.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(ServerInteraction.toJSON);
  }

  deletePoint({id}) {
    return this._load({url: `points/${id}`, method: methods.DELETE});
  }

  _load({url, method = methods.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}/${url}`, {method, body, headers})
      .then(ServerInteraction.checkStatus)
      .catch((error) => {
        throw error;
      });
  }

  static toJSON(response) {
    return response.json();
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
