// @flow
import { handleActions } from "redux-actions";

export default handleActions(
  {
    ADD_COMPLAINT: (state, action) => [...state, action.payload]
  },
  []
);
