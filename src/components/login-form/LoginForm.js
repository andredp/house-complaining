// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Card, CardTitle, Form, Input, Button, FormGroup, FormFeedback } from 'reactstrap';
import { getAuthErrors } from '../../reducers/';
import { authenticate } from '../../actions/auth';

import './LoginForm.css';

type Error = {
  +field: string,
  +message: string,
};

type Props = {
  errors: Array<Error>,
  authenticate: (username: string, password: string) => void,
};

type State = {
  username: string,
  password: string,
};

class LoginForm extends React.Component {
  props: Props;
  state: State = {
    username: '',
    password: '',
  };

  handleInputChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    const target = event.currentTarget;
    const name = target.name;
    this.setState({ [name]: target.value });
  };

  onLoginClick = () => {
    this.props.authenticate(this.state.username, this.state.password);
  };

  getFieldError = (field: string): ?Error => this.props.errors.find(error => error.field === field);

  getFieldErrorState = (field: string): string => {
    const error = this.getFieldError(field);
    return typeof error === 'undefined' ? '' : 'danger';
  };

  getFieldErrorMessage = (field: string): string => {
    const error = this.getFieldError(field);
    return typeof error === 'undefined' || error === null ? '' : error.message;
  };

  render = () =>
    (<Card className="login-form" inverse block>
      <CardTitle className="text-center">Welcome!</CardTitle>

      <Form>
        <FormGroup color={this.getFieldErrorState('username')}>
          <Input
            state={this.getFieldErrorState('username')}
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <FormFeedback className="text-left">
            {this.getFieldErrorMessage('username')}
          </FormFeedback>
        </FormGroup>

        <FormGroup color={this.getFieldErrorState('password')}>
          <Input
            state={this.getFieldErrorState('password')}
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
          <FormFeedback className="text-left">
            {this.getFieldErrorMessage('password')}
          </FormFeedback>
        </FormGroup>

        <Button onClick={this.onLoginClick} block color="primary">
          Login
        </Button>
      </Form>
    </Card>);
}

const mapStateToProps = state => ({
  errors: getAuthErrors(state),
});

const mapDispatchToProps = {
  authenticate,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
