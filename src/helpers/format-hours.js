import {UTILS_DATE_DATA as time} from "./utils-date-data";

export const formatHours = (hours) => hours % 1 ? `${Math.floor(hours)}H ${Math.floor(hours % 1 * time.minutes)}M` : `${Math.floor(hours)}H`;
