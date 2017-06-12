// @flow
import React from 'react';
import { Card, CardTitle } from 'reactstrap';
import LoginForm from '../../components/forms/LoginForm';
import BasePage from '../base/BasePage';

import './LoginPage.css';

const LoginPage = () =>
  (<BasePage>
    <div className="login-form-wrapper">
      <Card className="login-form" inverse block>
        <CardTitle className="text-center">Welcome!</CardTitle>
        <LoginForm />
      </Card>
    </div>
  </BasePage>);

export default LoginPage;
