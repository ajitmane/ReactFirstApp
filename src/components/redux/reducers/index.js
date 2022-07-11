import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import apiCallsInProgressReducer from "./apiStatusReducers";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallsInProgress: apiCallsInProgressReducer,
});

export default rootReducer;
