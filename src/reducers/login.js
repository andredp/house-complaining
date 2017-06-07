// @flow
import { handleActions } from "redux-actions";
import axios from "axios";

type Error = {
  +field: string,
  +message: string
};

type State = {
  +auth_key: string,
  +isLoggedIn: boolean,
  +errors: Array<Error>
};

const initialState: State = {
  auth_key: "",
  isLoggedIn: false,
  errors: []
};

export default handleActions(
  {
    LOGIN_USER_PENDING: () => {},

    LOGIN_USER_FULFILLED: (state: State, action): State => {
      const auth_token = action.payload.data.access_token;
      axios.defaults.headers.common["Authorization"] = auth_token;

      return {
        auth_key: auth_token,
        isLoggedIn: true,
        errors: []
      };
    },

    LOGIN_USER_REJECTED: (state: State, action): State => ({
      ...state,
      errors: action.payload.response.data
    })
  },
  initialState
);

type Store = {
  login: State
};

export const getLoginErrors = (state: Store) => state.login.errors;
export const getIsLoggedIn = (state: Store) => state.login.isLoggedIn;
