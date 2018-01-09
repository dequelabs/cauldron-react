import * as types from './types';
import store from '../store';

const getDirection = (orientation, which) => {
  if (orientation === 'horizontal') {
    if (which === 37) {
      return 'prev';
    }

    return which === 39 && 'next';
  }

  if (which === 38) {
    return 'prev';
  }

  return which === 40 && 'next';
};

export const onMenuKeydown = (orientation, action, which) => {
  const type = types[action];
  const key = action === types.TOP_BAR_FOCUS_INDEX ? 'topBar' : 'sideBar';
  const currentIndex = store.getState().menu[key].focusIndex || 0;
  const dir = getDirection(orientation, which);

  if (dir) {
    store.dispatch({
      type,
      data: dir === 'next' ? currentIndex + 1 : currentIndex - 1
    });
  }
};

export const menuItemIdentify = (action, index) => {
  store.dispatch({
    type: types[action],
    data: index
  });
};

export const triggerToggle = () => {
  const prevOpenState = store.getState().menu.isOpen;

  store.dispatch({
    type: types.TRIGGER_TOGGLE,
    data: !prevOpenState
  });
};

export const sideBarTriggerIdentify = () => {
  store.dispatch({
    type: types.SIDE_BAR_TRIGGER_IDENTIFY
  });
};

export const unsuppressTopBarFocus = () => {
  store.dispatch({
    type: types.UNSUPPRESS_TOP_BAR_FOCUS
  });
};
