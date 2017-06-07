// @flow
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../../reducers/auth";
import LoginForm from "../../components/login-form";
import BasePage from "../base/BasePage";

import "./LoginPage.css";

const LoginPage = props => {
  // If user is logged in, redirects it...
  if (props.isLoggedIn) {
    const { from } = props.location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <BasePage>
      <div className="login-form-wrapper">
        <LoginForm />
      </div>
    </BasePage>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

export default connect(mapStateToProps)(LoginPage);
