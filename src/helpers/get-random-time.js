import {getRandomInteger} from "./get-random-integer";
import {UTILS_DATE_DATA as time} from "./utils-date-data";

export const getRandomTime = () => {
  const randomHour = Math.floor(Math.random() * getRandomInteger(1, 24));
  return Date.now() + randomHour * time.minutes * time.seconds * time.milliseconds;
};
