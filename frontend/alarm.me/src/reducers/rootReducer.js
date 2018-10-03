import { combineReducers } from 'redux';
import alarmReducer from './alarmReducer.js';

//In case another reducer is needed eventually
const rootReducer = combineReducers({
  alarmReducer
});

export default rootReducer;
