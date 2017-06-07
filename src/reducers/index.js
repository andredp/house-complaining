// @flow
import { combineReducers } from "redux";
import complaints from "./complaints";
import auth from "./auth";

export default combineReducers({
  complaints,
  auth
});
