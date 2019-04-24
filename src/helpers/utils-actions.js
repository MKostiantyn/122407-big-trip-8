import {Time, Currency} from "./utils-data";

const convertMillisecondsToHours = (milliseconds) => milliseconds / (Time.MINUTES * Time.SECONDS * Time.MILLISECONDS);

const formatHours = (hours) => {
  const dayHours = Time.HOURS;
  const hoursFloor = Math.floor(hours);
  const durationDaysFloor = hours >= dayHours ? Math.floor(hoursFloor / dayHours) : 0;
  const durationHoursFloor = hoursFloor - (durationDaysFloor * dayHours);
  const durationMinutes = hours % 1 * Time.MINUTES;
  const durationMinutesFloor = Math.floor(durationMinutes);
  const durationDaysString = durationDaysFloor ? `${durationDaysFloor}D` : ``;
  const durationHoursString = durationHoursFloor ? ` ${durationHoursFloor}H` : ``;
  const durationMinutesString = durationMinutesFloor ? ` ${durationMinutesFloor}M` : ``;

  return `${durationDaysString}${durationHoursString}${durationMinutesString}`.trim();
};

const objectDeepCopying = (sourceObject) => {
  const iterateObject = (iterationObject) => {
    const accumulatorElement = Array.isArray(iterationObject) ? [] : {};
    return Object.keys(iterationObject).reduce((total, item) => {
      if (iterationObject[item]
        && typeof iterationObject[item] === `object`
        && (iterationObject[item].constructor === Object || iterationObject[item].constructor === Array)) {
        total[item] = iterateObject(iterationObject[item]);
      } else {
        total[item] = iterationObject[item];
      }
      return total;
    }, accumulatorElement);
  };
  return iterateObject(sourceObject);
};

const createDomElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const convertPriceToCurrency = (units) => {
  const unitsFormatted = !isNaN(units) ? +units : 0;
  const price = unitsFormatted * Currency.RATE;
  return `${price}`;
};

const removeDomElement = (element) => {
  if (element && element.nodeName) {
    element.parentNode.removeChild(element);
  }
};

const convertPriceFromCurrency = (currencyPrice) => {
  const currencyPriceFormatted = !isNaN(currencyPrice) ? +currencyPrice : 0;
  const units = currencyPriceFormatted / Currency.RATE;
  return `${units}`;
};

const convertNumberToPriceFormat = (number) => {
  const quantityDecimalPlace = 2;
  const helperNumberToRound = +`1${`0`.repeat(quantityDecimalPlace)}`;
  return typeof number === `number` ? (Math.round(number * helperNumberToRound) / helperNumberToRound).toFixed(quantityDecimalPlace) : number;
};

const removeAllChildrenFromElement = (element) => {
  if (element && element.nodeName) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
};

export {
  convertMillisecondsToHours,
  formatHours,
  objectDeepCopying,
  createDomElement,
  convertPriceToCurrency,
  removeDomElement,
  convertPriceFromCurrency,
  convertNumberToPriceFormat,
  removeAllChildrenFromElement
};
