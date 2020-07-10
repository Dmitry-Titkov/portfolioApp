import { combineReducers } from "redux";
import appState from "./AppState/reducer";
import user from "./user/reducer";

export default combineReducers({
  appState,
  user,
});
