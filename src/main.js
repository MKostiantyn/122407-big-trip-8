import {ServerInteraction} from "./server-interaction-component";
import {Provider} from "./provider-component";
import {renderPoints} from "./render-point-components";
import {renderFilters} from "./render-filter-components";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const SERVER_URL = `https://es8-demo-srv.appspot.com/big-trip`;
const pointsContainerElement = document.querySelector(`.trip-day__items`);
const serverInteraction = new ServerInteraction({url: SERVER_URL, authorization: AUTHORIZATION});
const provider = new Provider();
if (pointsContainerElement && pointsContainerElement.nodeName) {
  pointsContainerElement.textContent = `Loading route...`;
  serverInteraction.getPoints()
    .then((points) => {
      provider.points = points;
      return serverInteraction.getDestinations();
    })
    .then((destinations) => {
      provider.destinations = destinations;
      return serverInteraction.getOffers();
    })
    .then((offers) => {
      provider.offers = offers;
      renderFilters(provider, pointsContainerElement, serverInteraction);
      renderPoints(provider, pointsContainerElement, serverInteraction);
    })
    .catch((error) => {
      pointsContainerElement.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
      throw error;
    });
}
