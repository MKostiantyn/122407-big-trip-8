import {FilterItems} from "./helpers/utils-data";
import {Filter} from "./filter-component";
import {renderPoints} from "./render-point-components";
import {removeAllChildrenFromElement} from "./helpers/utils-actions";

export const renderFilters = (provider, pointsContainerElement, serverInteraction) => {
  const filtersElement = document.querySelector(`.trip-filter`);
  removeAllChildrenFromElement(filtersElement);
  if (filtersElement
    && filtersElement.nodeName
    && FilterItems
    && FilterItems.length) {
    FilterItems.forEach((item, index) => {
      const name = item.name;
      const isChecked = provider.activeFilter ? provider.activeFilter === item.name : !index;
      const filterComponent = new Filter({name, isChecked});
      filtersElement.appendChild(filterComponent.render());
      filterComponent.onChange = () => {
        provider.activeFilter = item;
        renderPoints(provider, pointsContainerElement, serverInteraction);
      };
    });
  }
};
