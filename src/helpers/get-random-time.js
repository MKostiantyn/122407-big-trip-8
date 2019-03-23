import getRandomInteger from './get-random-integer';

export default () => {
  const hour = Math.floor(Math.random() * getRandomInteger(1, 24));
  return Date.now() + hour * 60 * 60 * 1000;
};
