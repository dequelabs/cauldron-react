const mockStore = (initialState, dispatch = () => {}) => ({
  dispatch,
  getState: () => initialState
});

export default mockStore;
