import getRandomInteger from './get-random-integer';

export default (text = ``) => {
  const textArray = text.split(`.`);
  const textArrayFormatted = textArray.slice(0, -1).map((item) => `${item.trim()}.`);
  const arrayLength = textArrayFormatted.length;
  return textArrayFormatted.sort(() => 0.5 - Math.random()).slice(getRandomInteger(arrayLength - 3, arrayLength - 1)).join(` `);
};

