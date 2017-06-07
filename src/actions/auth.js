// @flow
import { createActions } from "redux-actions";
import WebAPI from "../utils/WebAPI";

export default createActions({
  AUTHENTICATE: WebAPI.authenticate
});
