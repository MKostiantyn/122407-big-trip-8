import convertPriceToEuro from './helpers/convert-price-to-euro';

export default (offers = []) => offers.reduce((accumulator, item, index, array) => {
  if (!index) {
    return accumulator + `<ul class="trip-point__offers"><li><button class="trip-point__offer">${convertPriceToEuro(item.price)} ${item.title}</button></li>`;
  }
  if (index === array.length - 1) {
    return accumulator + `<li><button class="trip-point__offer">${convertPriceToEuro(item.price)} ${item.title}</button></li></ul>`;
  }
  return accumulator + `<li><button class="trip-point__offer">${convertPriceToEuro(item.price)} ${item.title}</button></li>`;
}, ``);
