import {convertPriceToCurrency} from "./helpers/utils-actions";
import {Currency} from "./helpers/utils-data";

export class PointDetailsOffers {
  constructor(offers) {
    this._offers = offers;
  }

  get template() {
    const offers = this._getOffersTemplate();
    return `<section class="point__offers"><h3 class="point__details-title">offers</h3>${offers}</section>`;
  }

  _getOffersTemplate() {
    const offers = this._offers;
    const getOfferTemplate = (offer) => {
      const price = offer && offer.hasOwnProperty(`price`) ? convertPriceToCurrency(offer.price) : 0;
      const isChosen = offer && offer.hasOwnProperty(`accepted`) && offer[`accepted`] ? `checked` : ``;
      const id = offer && offer.hasOwnProperty(`name`) ? offer[`name`].toLowerCase().replace(/ /g, `-`) : ``;
      const name = offer && offer.hasOwnProperty(`name`) ? offer[`name`] : ``;
      return `<input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="${id}" ${isChosen}>
              <label for="${id}" class="point__offers-label">
                <span class="point__offer-service">${name}</span> + ${Currency.SYMBOL}<span class="point__offer-price">${price}</span>
              </label>`;
    };
    const offersTemplate = offers.reduce((accumulator, item) => {
      accumulator += getOfferTemplate(item);
      return accumulator;
    }, ``);
    return offersTemplate ? `<div class="point__offers-wrap">${offersTemplate}</div>` : ``;
  }
}
