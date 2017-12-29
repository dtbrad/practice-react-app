import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoginPage = ({ loggedIn, logIn, logOut, history }) => {
  const loginStatus = loggedIn ? 'in' : 'out';
  const loginButton = loggedIn ? 'out' : 'in';

  const handleLogIn = async () => {
    if (loggedIn) {
      await logOut();
      history.push('/welcome_page');
    } else {
      await logIn();
      history.push('/oranges');
    }
  };

  return (
    <Jumbotron className="text-center">
      <h3>You are currently logged {loginStatus}</h3>
      <Button onClick={handleLogIn} >Click to log {loginButton}</Button>
    </Jumbotron>
  );
};

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  history: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

LoginPage.defaultProps = {
  history: {
    pathname: '',
  },
};


export default LoginPage;
