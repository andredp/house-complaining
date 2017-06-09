// @flow
import React from 'react';
import LoginForm from '../../components/login-form';
import BasePage from '../base/BasePage';

import './LoginPage.css';

const LoginPage = () =>
  (<BasePage>
    <div className="login-form-wrapper">
      <LoginForm />
    </div>
  </BasePage>);

export default LoginPage;
