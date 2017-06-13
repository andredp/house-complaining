// @flow
import React from 'react';
import Navbar from '../../components/navbar';

import './BasePage.css';

type Props = {
  children: any,
};

const BasePage = (props: Props) =>
  (<div className="site-wrapper">
    <Navbar />
    {props.children}
  </div>);

export default BasePage;
