import {Event} from "./helpers/utils-data";

export class PointEvents {
  constructor(event) {
    this._event = event;
  }

  get template() {
    const chosenEvent = this._getChosenEventTemplate();
    const availableEvents = this._getAvailableEventsTemplate();
    return `<div class="travel-way">${chosenEvent}${availableEvents}</div>`;
  }

  _getChosenEventTemplate() {
    const eventObject = Event[this._event];
    const eventIcon = eventObject[`icon`];
    return `<label class="travel-way__label" for="travel-way__toggle">${eventIcon}</label>
            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle" value="${this._event}">`;
  }

  _getAvailableEventsTemplate() {
    const eventChosen = this._event;
    const eventGroups = Object.keys(Event).reduce((accumulator, eventName) => {
      const eventData = Event[eventName];
      const eventType = eventData[`type`];
      const eventIcon = eventData[`icon`];
      const inputCheckedAttribute = eventChosen === eventName ? `checked` : ``;
      const labelText = `${eventIcon} ${eventName}`;
      const inputId = `travel-way-${eventName}`;
      const getTemplateEvent = (id, attributeChecked, name) => {
        return `<input class="travel-way__select-input visually-hidden" type="radio" id="${id}" name="travel-way" value="${name}" ${attributeChecked}>
              <label class="travel-way__select-label" for="${id}">${name}</label>`;
      };
      if (eventType === `action`) {
        accumulator.actionGroup += getTemplateEvent(inputId, inputCheckedAttribute, labelText);
      } else {
        accumulator.stayGroup += getTemplateEvent(inputId, inputCheckedAttribute, labelText);
      }

      return accumulator;
    }, {
      actionGroup: ``,
      stayGroup: ``
    });
    const actionGroup = eventGroups[`actionGroup`] ? `<div class="travel-way__select-group">${eventGroups[`actionGroup`]}</div>` : ``;
    const stayGroup = eventGroups[`stayGroup`] ? `<div class="travel-way__select-group">${eventGroups[`stayGroup`]}</div>` : ``;
    return actionGroup || stayGroup ? `<div class="travel-way__select">${actionGroup}${stayGroup}</div>` : ``;
  }
}
