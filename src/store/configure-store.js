import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import promiseMiddleware from "redux-promise-middleware";
import loggerMiddleware from "./logger";

export default initialState =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(loggerMiddleware, promiseMiddleware()))
  );
