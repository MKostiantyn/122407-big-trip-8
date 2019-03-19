import convertPriceToEuro from './helpers/convert-price-to-euro';

export default (price = 0, offers = []) => {
  const conditionalUnitsPrice = offers.reduce((accumulator, value) => accumulator + value.price, price);
  return convertPriceToEuro(conditionalUnitsPrice);
};
