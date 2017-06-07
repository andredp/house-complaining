// @flow
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import LoginPage from "./pages/login";

//TODO: remove
import { Button } from "reactstrap";

const App = () =>
  <BrowserRouter>
    <div>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute exact={true} path="/" component={Button} />
      <PrivateRoute path="/teste" component={Button} />
      <PrivateRoute path="/ola" component={Button} />
    </div>
  </BrowserRouter>;

export default App;
