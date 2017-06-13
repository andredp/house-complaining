// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Button, Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { logout } from '../../actions/auth';

type NavItemProps = {
  label: string,
  to: string,
};

const AppNavItem = ({ label, to }: NavItemProps) =>
  (<NavItem key={label}>
    <NavLink tag={Link} to={to}>{label}</NavLink>
  </NavItem>);

type NavbarProps = {
  logout: typeof logout,
  push: string => void,
};

class AppNavbar extends React.Component {
  props: NavbarProps;

  onLogout = () => {
    this.props.logout();
    this.props.push('/');
  };

  navItems = [{ label: 'Login', to: '/login' }, { label: 'Home', to: '/home' }];

  render() {
    const navItems = this.navItems.map(item => <AppNavItem {...item} key={item.label} />);
    return (
      <Navbar className="header" light color="faded">
        <NavbarBrand tag={Link} to="/">House App</NavbarBrand>
        <Nav className="mr-auto" navbar>
          {navItems}
          <NavItem>
            <Button onClick={this.onLogout}>Logout</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapDispatchToProps = {
  logout,
  push,
};

export default connect(null, mapDispatchToProps)(AppNavbar);
