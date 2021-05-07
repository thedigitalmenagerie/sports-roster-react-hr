import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';
import './NavBar.scss';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
  <NavItem>
    <Link className="nav-link" to="/players">Players</Link>
  </NavItem>
  );

  return (
    <div>
      <Navbar id="Navbar" light expand="md">
              {
                user !== null
                && <NavbarBrand>
                  {
                    user
                      ? <Link className="nav-link" to="/home">Home</Link>
                      : <Link className="nav-link" to="/authscreen">Authorization Screen</Link>
                  }
                  </NavbarBrand>
              }
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { user && authenticated()}
              {
                user !== null
                && <NavItem className="authButtons">
                  {
                    user
                      ? <Button id="signOut" onClick={signOutUser}>Sign Out</Button>
                      : <Button id="signIn" onClick={signInUser}>Sign In</Button>
                  }
                </NavItem>
              }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
