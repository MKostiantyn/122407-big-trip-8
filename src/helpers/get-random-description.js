import getRandomInteger from './get-random-integer';

export default (text = ``) => {
  const textArray = text.split(`.`);
  textArray.pop();
  const textArrayFormatted = textArray.map((item) => `${item.trim()}.`);
  const arrayLength = textArrayFormatted.length;
  return textArrayFormatted.sort(() => 0.5 - Math.random()).slice(getRandomInteger(arrayLength - 3, arrayLength - 1)).join(` `);
};

