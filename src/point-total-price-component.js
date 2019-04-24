import {convertPriceToCurrency} from "./helpers/utils-actions";

export class PointTotalPrice {
  constructor(offers, price) {
    this._offers = offers;
    this._price = price;
  }

  get template() {
    const totalPriceUnits = this._getPointTotalPrice();
    const totalPrice = convertPriceToCurrency(totalPriceUnits);
    return `<input type="hidden" class="point__total-price" name="total-price" value="${totalPrice}">`;
  }

  _getChosenOffers() {
    const offers = this._offers;
    return Array.isArray(offers) && offers.length ? offers.filter((item) => item.hasOwnProperty(`accepted`) && item[`accepted`]) : [];
  }

  _getPointTotalPrice() {
    return this._getChosenOffers().reduce((accumulator, item) => +item.price + accumulator, +this._price);
  }
}