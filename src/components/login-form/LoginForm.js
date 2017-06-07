// @flow
import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardTitle,
  CardBlock,
  Form,
  Input,
  Button,
  FormGroup,
  FormFeedback
} from "reactstrap";
import { getLoginErrors } from "../../reducers/login";
import loginActions from "../../actions/login";

type Error = {
  +field: string,
  +message: string
};

type Props = {
  +errors: Array<Error>,
  +loginUser: (username: string, password: string) => void
};

type State = {
  username: string,
  password: string
};

class LoginForm extends React.Component {
  props: Props;
  state: State = {
    username: "",
    password: ""
  };

  handleInputChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    const target = event.currentTarget;
    const name = target.name;
    this.setState({ [name]: target.value });
  };

  onLoginClick = () => {
    this.props.loginUser(this.state.username, this.state.password);
  };

  getFieldError = (field: string): ?Error =>
    this.props.errors.find(error => error.field === field);

  getFieldErrorState = (field: string): string => {
    const error = this.getFieldError(field);
    return typeof error === "undefined" ? "" : "danger";
  };

  getFieldErrorMessage = (field: string): string => {
    const error = this.getFieldError(field);
    return typeof error === "undefined" || error === null ? "" : error.message;
  };

  render = () => {
    return (
      <Card>
        <CardBlock>
          <CardTitle>Login</CardTitle>

          <Form>
            <FormGroup color={this.getFieldErrorState("username")}>
              <Input
                state={this.getFieldErrorState("username")}
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
              <FormFeedback>
                {this.getFieldErrorMessage("username")}
              </FormFeedback>
            </FormGroup>

            <FormGroup color={this.getFieldErrorState("password")}>
              <Input
                state={this.getFieldErrorState("password")}
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                type="password"
              />
              <FormFeedback>
                {this.getFieldErrorMessage("password")}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Button onClick={this.onLoginClick} block color="primary">
                Login
              </Button>
            </FormGroup>
          </Form>
        </CardBlock>
      </Card>
    );
  };
}

const mapStateToProps = state => ({
  errors: getLoginErrors(state)
});

const mapDispatchToProps = {
  loginUser: loginActions.loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
