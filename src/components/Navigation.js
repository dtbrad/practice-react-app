import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Navigation = ({ loggedIn }) => {
  const status = loggedIn ? 'LogOut Page' : 'LogIn Page';
  const privateLinks = (
    loggedIn ? (
      [
        <LinkContainer key={1} to="/oranges">
          <NavItem eventKey={2}> Oranges</NavItem>
        </LinkContainer>,
        <LinkContainer key={3} to="/apples">
          <NavItem eventKey={4}>Apples</NavItem>
        </LinkContainer>,
      ]
    ) : (
      null
    )
  );

  return (
    <Navbar>
      <Nav>
        <LinkContainer to="/welcome_page">
          <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
        {privateLinks}
        <LinkContainer to="/login_page">
          <NavItem eventKey={4}> {status}</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
