// @flow
import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Navbar, Nav, NavItem, NavLink, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';

import './BasePage.css';

type Props = {
  +children: any,
};

const BasePage = (props: Props) =>
  (<div className="site-wrapper">
    <header>
      <AppNavbar />
    </header>
    {props.children}
  </div>);

class AppNavbar extends React.Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render = () =>
    (<Navbar toggleable="sm" inverse color="inverse">
      <NavbarToggler right onClick={this.toggle} />
      <NavbarBrand className="app-logo" href="/">
        <FontAwesome name="cog" spin size="2x" />
        <span className="app-name">House App</span>
      </NavbarBrand>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem className="active">
            <NavLink tag={Link} to="/">Base</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/home">Home</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>);
}

export default BasePage;
