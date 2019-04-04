import {initialDataMapped} from "./initial-data-mapped";
import {objectDeepCopying} from "./helpers/object-deep-copying";

export const getInitialDataByPlace = (place) => {
  if (initialDataMapped && Array.isArray(initialDataMapped)) {
    const dataByPlaceSource = initialDataMapped.find((item) => typeof item === `object` && item.place === place);
    return objectDeepCopying(dataByPlaceSource);
  }
  return {};
};
