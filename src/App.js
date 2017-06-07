// @flow
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import BasePage from "./pages/base/BasePage";

const App = () =>
  <BrowserRouter>
    <div>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute exact={true} path="/" component={HomePage} />
      <PrivateRoute path="/teste" component={BasePage} />
      <PrivateRoute path="/ola" component={BasePage} />
    </div>
  </BrowserRouter>;

export default App;
