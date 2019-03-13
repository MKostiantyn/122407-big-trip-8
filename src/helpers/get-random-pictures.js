export default (quantity) => [...new Array(quantity)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
