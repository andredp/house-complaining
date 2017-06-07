// @flow
import { handleActions } from "redux-actions";
import axios from "axios";

type Error = {
  +field: string,
  +message: string
};

type State = {
  +auth_token: string,
  +isLoggedIn: boolean,
  +errors: Array<Error>
};

const initialState: State = {
  auth_token: "",
  isLoggedIn: false,
  errors: []
};

export default handleActions(
  {
    AUTHENTICATE_PENDING: () => {},

    AUTHENTICATE_FULFILLED: (state: State, action): State => {
      const auth_token = action.payload.data.access_token;
      axios.defaults.headers.common["Authorization"] = auth_token;

      return {
        isLoggedIn: true,
        auth_token,
        errors: []
      };
    },

    AUTHENTICATE_REJECTED: (state: State, action): State => ({
      ...state,
      errors: action.payload.response.data
    })
  },
  initialState
);

type Store = {
  auth: State
};

export const getLoginErrors = (state: Store) => state.auth.errors;
export const getIsLoggedIn = (state: Store) => state.auth.isLoggedIn;
