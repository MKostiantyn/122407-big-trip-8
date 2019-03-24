import {currencyRate} from './currency-data';
export const convertPriceToEuro = (units) => {
  const price = units * currencyRate;
  return `${price}`;
};
