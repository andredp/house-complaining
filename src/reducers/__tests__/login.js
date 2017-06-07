import login from "../login";
import loginActions from "../../actions/login";

test("login", () => {
  const initialState = [];
  const expectedState = [{ text: "Test" }];
  console.log(login(initialState, loginActions.loginUser(1)));
  // expect(login(initialState, loginActions.loginUser(1))).toEqual(expectedState);
});
