import store from '../../../store';
import { triggerToggle } from '../../../actions/menu';

export default (item, isSideBar) => {
  const link = item.querySelector('a');

  if (link) {
    link.click();

    if (isSideBar) {
      const main = document.querySelector('.dqpl-main-content');

      if (main) {
        if (!store.getState().viewport.isWide) { triggerToggle(); }

        main.tabIndex = -1;
        main.focus();
      }
    }
  }
};
