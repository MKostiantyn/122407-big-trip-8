import {getPointData} from './get-point-data';

export default (quantity) => [...new Array(quantity)].map(() => getPointData());
