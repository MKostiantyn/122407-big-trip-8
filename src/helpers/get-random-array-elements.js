import getRandomInteger from './get-random-integer';

export default (array, minimum, maximum) => {
  const arrayLength = array.length;
  const maxValue = maximum > arrayLength ? arrayLength : maximum;
  const minValue = minimum >= 0 && minimum < arrayLength ? minimum : 0;
  const randomInteger = array.length > 1 ? getRandomInteger(array.length - maxValue, array.length - minValue) : getRandomInteger(0, array.length - minValue);
  return array.sort(() => 0.5 - Math.random()).slice(randomInteger);
};
