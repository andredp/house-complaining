// @flow
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../../reducers/auth";

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      props.isLoggedIn
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />}
  />;

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

export default connect(mapStateToProps)(PrivateRoute);
