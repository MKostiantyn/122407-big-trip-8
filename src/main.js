import {ServerInteraction} from "./server-interaction-component";
import {renderPointComponents} from "./render-point-components";
import {Filter} from "./filter-component";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const SERVER_URL = `https://es8-demo-srv.appspot.com/big-trip`;
const filtersForm = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);
const serverInteraction = new ServerInteraction({url: SERVER_URL, authorization: AUTHORIZATION});
const serverData = {
  points: null,
  destinations: null,
  offers: null
};
if (pointsContainer && pointsContainer.nodeName) {
  pointsContainer.textContent = `Loading route...`;
  serverInteraction.getPoints()
    .then((points) => {
      serverData.points = points;
      return serverInteraction.getDestinations();
    })
    .then((destinations) => {
      serverData.destinations = destinations;
      return serverInteraction.getOffers();
    })
    .then((offers) => {
      offers.forEach((item) => {
        item.offers.forEach((offer) => {
          offer[`title`] = offer[`name`];
          delete offer[`name`];
          return offer;
        });
        return item;
      });
      serverData.offers = offers;
      renderPointComponents(serverData, pointsContainer, serverInteraction);
      if (filtersForm && filtersForm.nodeName) {
        const FILTER_ITEMS_ARRAY = [
          {
            name: `Everything`,
            filterFunction() {
              renderPointComponents(serverData, pointsContainer, serverInteraction);
            }
          },
          {
            name: `Future`,
            filterFunction() {
              const timeNow = Date.now();
              const dataFiltered = serverData.points.filter((item) => {
                return item.startTime > timeNow;
              });
              renderPointComponents({
                points: dataFiltered,
                offers: serverData.offers,
                destinations: serverData.destinations
              }, pointsContainer, serverInteraction);
            }
          },
          {
            name: `Past`,
            filterFunction() {
              const timeNow = Date.now();
              const dataFiltered = serverData.points.filter((item) => {
                return item.startTime < timeNow;
              });
              renderPointComponents({
                points: dataFiltered,
                offers: serverData.offers,
                destinations: serverData.destinations
              }, pointsContainer, serverInteraction);
            }
          }
        ];
        FILTER_ITEMS_ARRAY.forEach((filter, index) => {
          const filterComponent = new Filter({
            name: filter.name,
            isChecked: !index
          });
          filtersForm.appendChild(filterComponent.render());
          filterComponent.onFilter = filter.filterFunction;
        });
      }
    })
    .catch((error) => {
      pointsContainer.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
      throw error;
    });
}
