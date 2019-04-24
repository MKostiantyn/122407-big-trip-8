export class PointDetailsDestination {
  constructor(destination) {
    this._destination = destination;
  }

  get template() {
    const description = this._getDescriptionTemplate();
    const pictures = this._getPicturesTemplate();
    return `<section class="point__destination"><h3 class="point__details-title">Destination</h3>${description}${pictures}</section>`;
  }

  _getDescriptionTemplate() {
    const destination = this._destination;
    const description = destination && destination.hasOwnProperty(`description`) ? this._destination[`description`] : ``;
    return description ? `<p class="point__destination-text">${description}</p>` : ``;
  }

  _getPicturesTemplate() {
    const destination = this._destination;
    const pictures = destination && destination.hasOwnProperty(`pictures`) ? destination[`pictures`] : [];
    const picturesTemplate = pictures.reduce((accumulator, item) => {
      const src = item.src;
      const alt = item.description ? item.description : ``;
      if (src) {
        accumulator += `<img src="${src}" alt="${alt}" class="point__destination-image">`;
      }
      return accumulator;
    }, ``);
    return picturesTemplate ? `<div class="point__destination-images">${picturesTemplate}</div>` : ``;
  }
}