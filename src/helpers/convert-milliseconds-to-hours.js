import {UTILS_DATE_DATA as time} from "./utils-date-data";
export const convertMillisecondsToHours = (milliseconds) => milliseconds / (time.minutes * time.seconds * time.milliseconds);
