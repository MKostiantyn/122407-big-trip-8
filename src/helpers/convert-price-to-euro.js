import {CURRENCY_DATA as currency} from "./currency-data";
export const convertPriceToEuro = (units) => {
  const price = units * currency.rate;
  return `${price}`;
};
