import {Event} from "./helpers/utils-data";

export class PointDestinations {
  constructor(data) {
    this._event = data.event;
    this._destination = data.destination;
    this._destinations = data.destinations;
  }

  get template() {
    const chosenDestination = this._getChosenDestinationTemplate();
    const availableDestinations = this._getAvailableDestinationsTemplate();
    return `<div class="point__destination-wrap">${chosenDestination}${availableDestinations}</div>`;
  }

  _getChosenDestinationTemplate() {
    const eventName = this._event;
    const eventData = Event[eventName];
    const destination = this._destination;
    const titleEvent = eventData && eventData.hasOwnProperty(`title`) ? eventData[`title`] : ``;
    const titleDestination = destination && destination.hasOwnProperty(`name`) ? destination[`name`] : ``;
    return `<label class="point__destination-label" for="destination">${titleEvent}</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${titleDestination}" name="destination">`;
  }

  _getAvailableDestinationsTemplate() {
    const destinations = this._destinations;
    const destinationsTemplate = destinations.reduce((accumulator, item) => {
      accumulator += `<option value="${item.name}"></option>`;
      return accumulator;
    }, ``);
    return destinationsTemplate ? `<datalist id="destination-select">${destinationsTemplate}</datalist>` : ``;
  }
}
