export default (start, end) => `<span class="trip-point__timetable">${end ? `${start} - ${end}` : start}</span>`;
