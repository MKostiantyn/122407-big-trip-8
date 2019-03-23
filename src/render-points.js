import renderPoint from './render-point';
export default (arrayPoints = []) => arrayPoints.reduce((accumulator, item) => accumulator + renderPoint(item), ``);
