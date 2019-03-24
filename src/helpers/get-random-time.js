import {getRandomInteger} from './get-random-integer';

export const getRandomTime = () => {
  const randomHour = Math.floor(Math.random() * getRandomInteger(1, 24));
  return Date.now() + randomHour * 60 * 60 * 1000;
};
