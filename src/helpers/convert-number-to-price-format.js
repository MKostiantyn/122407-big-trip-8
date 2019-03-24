export const convertNumberToPriceFormat = (number) => {
  const quantityDecimalPlace = 2;
  const helperNumberToRound = +`1${`0`.repeat(quantityDecimalPlace)}`;
  return typeof number === `number` ? (Math.round(number * helperNumberToRound) / helperNumberToRound).toFixed(quantityDecimalPlace) : number;
};
