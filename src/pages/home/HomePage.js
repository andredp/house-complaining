// @flow
import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router';
import BasePage from '../base/BasePage';

const HomePage = () =>
  (<BasePage>
    <Button tag={Link} to="/login">Login</Button>
    <Button tag={Link} to="/home">Home</Button>
  </BasePage>);

export default HomePage;
