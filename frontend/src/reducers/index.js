import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userInputReducer from "./userInputReducer";

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  userInputReducer
});

export default rootReducer;
