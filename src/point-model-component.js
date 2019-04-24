import {objectDeepCopying} from "./helpers/utils-actions";

export class PointModel {
  constructor(data) {
    this.id = data[`id`];
    this.event = data[`type`];
    this.destination = data[`destination`];
    this.offers = data[`offers`];
    this.price = data[`base_price`];
    this.startTime = data[`date_from`];
    this.endTime = data[`date_to`];
    this.isFavorite = data[`is_favorite`];
  }

  static parsePoint(data) {
    return new PointModel(data);
  }

  static parsePoints(data) {
    return data.map(PointModel.parsePoint);
  }

  static parsePointToDefaultData(data) {
    return {
      'id': data.id,
      'type': data.event,
      'date_from': data.startTime,
      'date_to': data.endTime,
      'base_price': +data.price,
      'destination': objectDeepCopying(data.destination),
      'is_favorite': data.isFavorite,
      'offers': objectDeepCopying(data.offers)
    };
  }

}