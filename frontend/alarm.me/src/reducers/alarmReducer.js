import { ADD_ALARM, DELETE_ALARM, UPDATE_ALARM, CLEAR_ALARMS } from '../actions/actionTypes.js';

const alarmReducer = (state=[], action) => {
  let firstMatchIndex;
  switch (action.type) {
    case ADD_ALARM:
      //action.payload.numberInCart++;
      return [...state,action.payload];
    case DELETE_ALARM:
      //action.payload.numberInCart--;
      firstMatchIndex = state.indexOf(action.payload);
      return state.filter((item,index) => index !== firstMatchIndex);
    case CLEAR_ALARMS:
      return [];
    case UPDATE_ALARM:
      firstMatchIndex = state.indexOf(action.payload);
      return [...state, ]
    default:
      return state;
  }
}

export default alarmReducer;
