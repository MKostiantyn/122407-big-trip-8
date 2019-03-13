export default (time = new Date()) => {
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
  return `${hours}:${seconds}`;
};
