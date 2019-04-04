import {CURRENCY_DATA as currency} from "./currency-data";
export const convertPriceToCurrency = (units) => {
  const unitsFormatted = !isNaN(units) ? +units : 0;
  const price = unitsFormatted * currency.rate;
  return `${price}`;
};
