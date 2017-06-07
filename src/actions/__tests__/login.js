import { createAction } from "redux-actions";
import WebAPI from "../../utils/WebAPI";
import login from "./actions/auth";

test("user login action creation", () => {
  console.log(createAction("LOGIN_USER", WebAPI.postLoginUser)(1));
  expect(login.loginUser(1)).toEqual(
    createAction("LOGIN_USER", WebAPI.postLoginUser)(1)
  );
});
