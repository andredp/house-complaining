import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import WebAPI from "./utils/WebAPI";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configure-store";

import App from "./App";

axios.defaults.baseURL = WebAPI.HOST;

const initialStore = {};
const store = configureStore(initialStore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
