import {Currency, KeyCode} from "./helpers/utils-data";
import {AbstractPoint} from "./abstract-point-component";
import {PointEvents} from "./point-events-component";
import {PointDestinations} from "./point-destinations-component";
import {
  convertPriceToCurrency,
  createDomElement,
  convertPriceFromCurrency,
  convertNumberToPriceFormat,
  objectDeepCopying,
  removeDomElement
} from "./helpers/utils-actions";
import moment from "moment";
import {PointDetails} from "./point-details-component";
import {PointDetailsDestination} from "./point-details-destination-component";
import {PointDetailsOffers} from "./point-details-offers-component";
import {PointTotalPrice} from "./point-total-price-component";
import {PointModel} from "./point-model-component";

export class PointEdit extends AbstractPoint {
  constructor(data, destinations, offers) {
    super(data);
    this._id = data.id;
    this._availableDestinations = destinations;
    this._availableOffers = offers;
    this._isFavorite = data.isFavorite;
    this._onSubmit = null;
    this._onDelete = null;
    this._onExit = null;
    this._duplicatedData = {
      id: data.id,
      event: data.event,
      destination: objectDeepCopying(data.destination),
      offers: objectDeepCopying(data.offers),
      price: data.price,
      startTime: data.startTime,
      endTime: data.endTime,
      isFavorite: data.isFavorite
    };

    this._onSubmitForm = this._onSubmitForm.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onExitKeyPress = this._onExitKeyPress.bind(this);
    this._onChangeEvent = this._onChangeEvent.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);
  }

  _onSubmitForm(event) {
    event.preventDefault();
    const formElement = this._element.querySelector(`[data-point-form]`);
    if (formElement && formElement.nodeName) {
      const formData = new FormData(formElement);
      const processedData = this._processFormData(formData);
      if (typeof this._onSubmit === `function`) {
        this._onSubmit(processedData);
      }
    }
  }

  _onDeleteClick(event) {
    event.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete(this._id);
    }
  }

  _onExitKeyPress(event) {
    if (typeof this._onExit === `function` && event.keyCode === KeyCode.ESC) {
      event.preventDefault();
      this._onExit();
    }
  }

  _onChangeDestination(event) {
    const eventChosenElement = this._element.querySelector(`[id="travel-way__toggle"]`);
    const eventChosenName = eventChosenElement.value;
    const destinationChosenName = event.target.value ? event.target.value.trim() : ``;
    const destinationChosenData = this._availableDestinations.find((item) => item.name === destinationChosenName);
    if (destinationChosenData) {
      this._partialUpdatePointDestination(destinationChosenData);
      this._partialUpdatePointDetailsOffers(eventChosenName, destinationChosenName);
    } else {
      alert(`WRONG DESTINATION!`);
    }
  }

  _onChangeEvent(event) {
    const target = event.target;
    const chosenEvent = target.id.replace(`${target.name}-`, ``);
    const chosenDestinationElement = this._element.querySelector(`#destination`);
    const chosenDestinationName = chosenDestinationElement.value;
    this._toggleEventsList();
    this.unbind();
    this._partialUpdatePointEvent(chosenEvent);
    this._partialUpdatePointDetailsDestination(chosenEvent);
    this._partialUpdatePointDetailsOffers(chosenEvent, chosenDestinationName);
    this._partialUpdatePointDetailsTotalPrice(chosenEvent);
    this.bind();
  }

  _processFormData(data) {
    const formData = {};
    for (const pair of data.entries()) {
      const [property, value] = pair;
      if (formData.hasOwnProperty(property)) {
        formData[property] = `${formData[property]},${value}`;
      } else {
        formData[property] = value;
      }
    }
    return this._formatDataToDefault(formData);
  }

  _formatDataToDefault(formData) {
    const event = formData[`travel-way`].replace(/[^a-zA-Z-]/g, ``);
    const price = convertPriceFromCurrency(formData[`price`]);
    const formattedPrice = convertNumberToPriceFormat(price);
    const startTime = formData[`date-start`];
    const endTime = formData[`date-end`];
    const isNextDay = parseFloat(startTime.trim()) > parseFloat(endTime.trim());
    const day = formData[`day`];
    const nextDay = isNextDay ? moment(day, `MMM DD`).add(1, `days`).format(`MMM DD`) : null;
    const formattedStartTime = moment(`${day} ${startTime.trim()}`, `MMM DD HH:mm`);
    const formattedEndTime = moment(`${isNextDay ? nextDay : day} ${endTime.trim()}`, `MMM DD HH:mm`);
    this._duplicatedData[`event`] = event;
    this._duplicatedData[`price`] = formattedPrice;
    this._duplicatedData[`startTime`] = formattedStartTime.valueOf();
    this._duplicatedData[`endTime`] = formattedEndTime.valueOf();
    this._duplicatedData[`isFavorite`] = Boolean(formData[`favorite`]);
    this._duplicatedData[`offers`] = this._duplicatedData[`offers`].reduce((result, offer) => {
      const offerCopy = objectDeepCopying(offer);
      const offerId = offerCopy[`title`].trim().toLowerCase().replace(/ /g, `-`);
      offerCopy[`accepted`] = Boolean(formData[`offer`] && ~formData[`offer`].indexOf(offerId));
      result.push(offerCopy);
      return result;
    }, []);
    return PointModel.parsePointToDefaultData(this._duplicatedData);
  }

  _partialUpdatePointDestination(destinationChosen) {
    const oldPointDetailsDestination = this._element.querySelector(`.point__destination`);
    const parentPointDetailsDestination = oldPointDetailsDestination.parentNode;
    const newPointDetailsDestination = createDomElement(new PointDetailsDestination(destinationChosen).template);
    this._duplicatedData[`destination`] = objectDeepCopying(destinationChosen);
    parentPointDetailsDestination.replaceChild(newPointDetailsDestination, oldPointDetailsDestination);
  }

  _partialUpdatePointDetailsDestination(chosenEvent) {
    const oldPointDestinations = this._element.querySelector(`.point__destination-wrap`);
    const newPointDestinations = createDomElement(new PointDestinations({
      event: chosenEvent === this._event ? this._event : chosenEvent,
      destination: this._duplicatedData[`destination`],
      destinations: this._availableDestinations
    }).template);
    const parentPointDestinations = oldPointDestinations.parentNode;
    parentPointDestinations.replaceChild(newPointDestinations, oldPointDestinations);
  }

  _partialUpdatePointDetailsOffers(chosenEvent, chosenDestination) {
    const oldPointOffers = this._element.querySelector(`.point__offers`);
    const parentPointOffers = oldPointOffers.parentNode;
    if (chosenEvent === this._event && chosenDestination === this._destination.name) {
      const newPointOffers = createDomElement(new PointDetailsOffers(this._offers).template);
      this._duplicatedData[`offers`] = objectDeepCopying(this._offers);
      parentPointOffers.replaceChild(newPointOffers, oldPointOffers);
    } else {
      const chosenEventData = this._availableOffers.find((item) => item.type === chosenEvent);
      const offersByChosenEvent = chosenEventData && chosenEventData.hasOwnProperty(`offers`) ? chosenEventData.offers : [];
      const newPointOffers = createDomElement(new PointDetailsOffers(offersByChosenEvent).template);
      this._duplicatedData[`offers`] = offersByChosenEvent.length ? objectDeepCopying(offersByChosenEvent) : [];
      parentPointOffers.replaceChild(newPointOffers, oldPointOffers);
    }
  }

  _partialUpdatePointEvent(chosenEvent) {
    const oldPointEvents = this._element.querySelector(`.travel-way`);
    const newPointEvents = createDomElement(new PointEvents(chosenEvent).template);
    const parentPointEvents = oldPointEvents.parentNode;
    parentPointEvents.replaceChild(newPointEvents, oldPointEvents);
  }

  _partialUpdatePointDetailsTotalPrice(chosenEvent) {
    const chosenEventData = this._availableOffers.find((item) => item.type === chosenEvent);
    const offersByChosenEvent = chosenEventData && chosenEventData.hasOwnProperty(`offers`) ? chosenEventData.offers : [];
    const oldPointTotalPrice = this._element.querySelector(`.point__total-price`);
    const parentPointTotalPrice = oldPointTotalPrice.parentNode;
    const newPointTotalPrice = createDomElement(new PointTotalPrice(offersByChosenEvent, parentPointTotalPrice).template);
    parentPointTotalPrice.replaceChild(newPointTotalPrice, oldPointTotalPrice);
  }

  _toggleEventsList() {
    const inputToggle = this._element.querySelector(`[id="travel-way__toggle"]`);
    inputToggle.checked = !inputToggle.checked;
  }

  set onSubmit(functionOnSubmit) {
    this._onSubmit = functionOnSubmit;
  }

  set onDelete(functionOnDelete) {
    this._onDelete = functionOnDelete;
  }

  set onExit(functionOnExit) {
    this._onExit = functionOnExit;
  }

  get template() {
    const id = this._id;
    const day = this._startTime ? moment(this._startTime).format(`MMM DD`).toUpperCase() : ``;
    const pointEvents = new PointEvents(this._event).template;
    const pointDestinations = new PointDestinations({
      event: this._event,
      destination: this._destination,
      destinations: this._availableDestinations
    }).template;
    const startTime = moment(this._startTime).format(`HH:mm`);
    const endTime = this._endTime ? moment(this._endTime).format(`HH:mm`) : ``;
    const price = convertPriceToCurrency(this._price);
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;
    const pointDetails = new PointDetails({
      destination: this._destination,
      offers: this._offers,
      price: this._price
    }).template;
    return `<article class="point">
              <form action="" method="get" data-point-form>
                <input type="hidden" name="id" value="${id}"/>
                <header class="point__header">
                  <label class="point__date">
                    choose day
                    <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${day}">
                  </label>
                  ${pointEvents}
                  ${pointDestinations}
                  <div class="point__time">
                    choose time
                    <input class="point__input" type="text" value="${startTime}" name="date-start" placeholder="19:00">
                    <input class="point__input" type="text" value="${endTime}" name="date-end" placeholder="21:00">
                  </div>
                  <label class="point__price">write price
                    <span class="point__price-currency">${Currency.SYMBOL}</span>
                    <input class="point__input" type="text" value="${price}" name="price">
                  </label>
                  <div class="point__buttons">
                    <button class="point__button point__button--save" type="submit">Save</button>
                    <button class="point__button" type="reset">Delete</button>
                  </div>
                  <div class="paint__favorite-wrap">
                    <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${isFavoriteChecked}>
                    <label class="point__favorite" for="favorite">favorite</label>
                  </div>
                </header>
                ${pointDetails}
              </form>
            </article>`;
  }

  bind() {
    const formElement = this._element.querySelector(`[data-point-form]`);
    const eventInputs = formElement.querySelectorAll(`[name="travel-way"]`);
    const destinationInput = formElement.querySelector(`#destination`);
    destinationInput.addEventListener(`change`, this._onChangeDestination);
    eventInputs.forEach((item) => item.addEventListener(`change`, this._onChangeEvent));
    formElement.addEventListener(`submit`, this._onSubmitForm);
    formElement.addEventListener(`reset`, this._onDeleteClick);
    document.addEventListener(`keydown`, this._onExitKeyPress);
  }

  unbind() {
    const formElement = this._element.querySelector(`[data-point-form]`);
    const eventInputs = formElement.querySelectorAll(`[name="travel-way"]`);
    const destinationInput = formElement.querySelector(`#destination`);
    eventInputs.forEach((item) => item.removeEventListener(`change`, this._onChangeEvent));
    destinationInput.removeEventListener(`change`, this._onChangeDestination);
    formElement.removeEventListener(`submit`, this._onSubmitForm);
    formElement.removeEventListener(`reset`, this._onDeleteClick);
    document.removeEventListener(`keydown`, this._onExitKeyPress);
  }

  toggleBlockingOnSave(status) {
    const buttonSaveElement = this._element.querySelector(`.point__button[type="submit"]`);
    if (buttonSaveElement && buttonSaveElement.nodeName) {
      buttonSaveElement.textContent = status ? `Saving...` : `Save`;
    }
    this._toggleBlockingAllFormElements(status);
  }

  toggleBlockingOnDelete(status) {
    const buttonDeleteElement = this._element.querySelector(`.point__button[type="reset"]`);
    if (buttonDeleteElement && buttonDeleteElement.nodeName) {
      buttonDeleteElement.textContent = status ? `Deleting...` : `Delete`;
    }
    this._toggleBlockingAllFormElements(status);
  }

  _toggleBlockingAllFormElements(status) {
    const formElement = this._element.querySelector(`[data-point-form]`);
    if (formElement && formElement.nodeName) {
      [...formElement.elements].forEach((item) => {
        item.disabled = status;
      });
    }
  }

  toggleErrorResponse(status) {
    const articleElement = this._element;
    const parentElement = articleElement.parentNode;
    if (articleElement && articleElement.nodeName && parentElement && parentElement.nodeName) {
      if (status) {
        const styleTemplate = `<style>
                                @keyframes shake {
                                  0%,100% {transform: translateX(0);}
                                  10%,30%,50%,70%,90% {transform: translateX(-5px);}
                                  20%,40%,60%,80% {transform: translateX(5px);}
                                }
                                .shake {
                                  animation: shake 0.6s;
                                }
                              </style>`;
        const styleElement = createDomElement(styleTemplate);
        parentElement.insertBefore(styleElement, articleElement);
        articleElement.style.cssText = `border: 1px solid red`;
        articleElement.classList.add(`shake`);
      } else {
        const styleElement = parentElement.querySelector(`style`);
        removeDomElement(styleElement);
        articleElement.removeAttribute(`style`);
        articleElement.classList.remove(`shake`);
      }
    }
  }
}
