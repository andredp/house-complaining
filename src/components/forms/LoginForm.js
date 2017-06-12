// @flow
import React from 'react';
import { Field, reduxForm, propTypes as FormProps } from 'redux-form';
import { onSubmitActions } from 'redux-form-submit-saga';
import { Form, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import CustomField from './Field';
import { authenticate } from '../../actions/auth';

import './LoginForm.css';

const LoginForm = ({ error, handleSubmit, submitting, pristine }: FormProps) =>
  (<Form onSubmit={handleSubmit}>
    <Field name="username" type="text" component={CustomField} label="Username" />
    <Field name="password" type="password" component={CustomField} label="Password" />
    {error && <strong>{error}</strong>}
    <Button type="submit" color="primary" disabled={submitting || pristine} block>
      <FontAwesome name="paper-plane" /> Log In
    </Button>
  </Form>);

export default reduxForm({
  form: 'login-form',
  onSubmit: onSubmitActions(
    values => authenticate(values.username, values.password),
    'AUTH_LOGIN_SUCCESS',
    'AUTH_LOGIN_FAILED',
  ),
})(LoginForm);
