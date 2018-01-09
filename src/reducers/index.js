import { combineReducers } from 'redux';
import menu from './menu';
import viewport from './viewport';

export default combineReducers({
  menu,
  viewport
});
