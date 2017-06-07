// @flow
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { getIsLoggedIn } from "../../reducers/login";
import LoginForm from "../../components/login-form";
import BasePage from "../base/BasePage";

const LoginPage = props => {
  // If user is logged in, redirects it...
  if (props.isLoggedIn) {
    const { from } = props.location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <BasePage>
      <Container>
        <Row>
          <Col md={{ size: 8, push: 2 }}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </BasePage>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

export default connect(mapStateToProps)(LoginPage);
