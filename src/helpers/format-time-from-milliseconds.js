export const formatTimeFromMilliseconds = (...times) => times.reduce((accumulator, item, index) => {
  const date = new Date(item);
  const hours = date.getHours();
  const hoursFormatted = hours > 9 ? hours : `0${hours}`;
  const minutes = date.getMinutes();
  const minutesFormatted = minutes > 9 ? minutes : `0${minutes}`;
  const time = `${hoursFormatted}:${minutesFormatted}`;
  return !index ? accumulator + time : `${accumulator} - ${time}`;
}, ``);
