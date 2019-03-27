import {getRandomFloat} from "./get-random-float";
import {UTILS_DATE_DATA as time} from "./utils-date-data";

export const getRandomEndTime = (startTime) => {
  const randomHour = getRandomFloat(1, 5);
  return startTime + randomHour * time.minutes * time.seconds * time.milliseconds;
};
