export default (units) => {
  const currencySymbol = `€`;
  const currencyRate = 4;
  return `${currencySymbol} ${units * currencyRate}`;
};
