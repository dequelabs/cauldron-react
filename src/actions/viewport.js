import store from '../store';
import * as types from './types';

export const isWide = () => window.innerWidth >= 1024;

/**
 * Callback for a window resize event listener
 */
export const onResize = () => {
  const wide = isWide();
  const viewportState = store.getState().viewport;

  // update state if isWide has changed
  if (wide !== viewportState.isWide) {
    store.dispatch({
      type: types.VIEWPORT_SIZE_CHANGE,
      data: wide
    });

    const menuState = store.getState().menu;
    if (wide && menuState.hasHamburger && menuState.topBar.focusIndex === 0) {
      store.dispatch({
        type: types.FORCE_TOP_BAR_FOCUS_INDEX
      });
    }
  }
};
