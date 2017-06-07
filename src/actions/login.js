// @flow
import { createActions } from "redux-actions";
import WebAPI from "../utils/WebAPI";

export default createActions({
  LOGIN_USER: WebAPI.postLoginUser
});
