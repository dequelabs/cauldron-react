import * as types from '../actions/types';

const viewportReducer = (state = {}, action) => {
  switch (action.type) {
    case types.VIEWPORT_SIZE_CHANGE:
      return { ...state, isWide: action.data };

    default:
      return state;
  }
};

export default viewportReducer;
