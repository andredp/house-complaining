// @flow
import { combineReducers } from "redux";
import complaints from "./complaints";
import login from "./login";

export default combineReducers({
  complaints,
  login
});
