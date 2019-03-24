import {getRandomFloat} from './get-random-float';

export const getRandomEndTime = (startTime) => {
  const randomHour = getRandomFloat(1, 5);
  return startTime + randomHour * 60 * 60 * 1000;
};
