import * as types from '../actions/types';
import store from '../store';
import { isWide } from '../actions/viewport';

const defaultState = {
  sideBar: { focusIndex: 0 },
  topBar: { focusIndex: isWide() ? 1 : 0 }
};

const menuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOP_BAR_FOCUS_INDEX:
    case types.SIDE_BAR_FOCUS_INDEX: {
      let focusIndex = action.data;
      const key = action.type === types.TOP_BAR_FOCUS_INDEX ? 'topBar' : 'sideBar';
      const menuState = state[key];
      const begin = key === 'topBar' && store.getState().viewport.isWide ? 1 : 0;

      if (action.data > menuState.highestIndex) {
        // circularity -- from last to first
        focusIndex = begin;
      } else if (action.data < begin) {
        focusIndex = menuState.highestIndex;
      }

      const newState = { ...state };
      newState[key] = {
        ...menuState,
        focusIndex
      };

      return newState;
    }

    case types.SIDE_BAR_ITEM_IDENTIFY:
    case types.TOP_BAR_ITEM_IDENTIFY: {
      const key = action.type === types.TOP_BAR_ITEM_IDENTIFY ? 'topBar' : 'sideBar';
      const menuState = state[key];

      if (!menuState.highestIndex || action.data > menuState.highestIndex) {
        const newState = { ...state };
        newState[key] = {
          ...menuState,
          highestIndex: action.data
        };

        return newState;
      }

      return state;
    }

    case types.TRIGGER_TOGGLE:
      return {
        ...state,
        isOpen: action.data
      };

    case types.SIDE_BAR_TRIGGER_IDENTIFY:
      return {
        ...state,
        hasHamburger: true
      };

    case types.FORCE_TOP_BAR_FOCUS_INDEX: {
      const newState = { ...state };
      newState.topBar = { ...newState.topBar, focusIndex: 1, suppressFocus: true };

      return newState;
    }

    case types.UNSUPPRESS_TOP_BAR_FOCUS: {
      const newState = { ...state };
      newState.topBar = { ...newState.topBar, suppressFocus: false };

      return newState;
    }

    default:
      return state;
  }
};

export default menuReducer;
