import {PointDetailsDestination} from "./point-details-destination-component";
import {PointDetailsOffers} from "./point-details-offers-component";
import {PointTotalPrice} from "./point-total-price-component";

export class PointDetails {
  constructor(data) {
    this._destination = data.destination;
    this._offers = data.offers;
    this._price = data.price;
  }

  get template() {
    const detailsOffers = new PointDetailsOffers(this._offers).template;
    const detailsDestination = new PointDetailsDestination(this._destination).template;
    const totalPrice = new PointTotalPrice(this._offers, this._price).template;
    return `<section class="point__details">
              ${detailsOffers}
              ${detailsDestination}
              ${totalPrice}
            </section>`;
  }
}
