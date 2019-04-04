import {CURRENCY_DATA as currency} from "./currency-data";
export const convertPriceFromCurrency = (currencyPrice) => {
  const currencyPriceFormatted = !isNaN(currencyPrice) ? +currencyPrice : 0;
  const units = currencyPriceFormatted / currency.rate;
  return `${units}`;
};
