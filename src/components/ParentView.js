import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';
import Navigation from './Navigation';
import WelcomePage from './WelcomePage';
import FruitPage from './FruitPage';

const ParentView = ({ apples, oranges, loggedIn, logIn, logOut, transaction }) => (
  <BrowserRouter>
    <Grid>
      <h3 className="text-center"> Apples and Oranges </h3>
      <Navigation loggedIn={loggedIn} />
      <Switch>
        <Route path="/welcome_page" component={WelcomePage} />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/welcome_page" />}
        />
        <Route
          path="/login_page"
          render={props => (<LoginPage logIn={logIn} logOut={logOut} loggedIn={loggedIn} {...props} />)}
        />
        <Route
          path="/apples"
          render={() => (
            loggedIn === true ? (
              <FruitPage
                fruitName="apples"
                {...apples}
                transaction={transaction}
              />
            ) : (
              <Redirect to="/login_page" />
            )
          )}
        />
        <Route
          path="/oranges"
          render={() => (
            loggedIn === true ? (
              <FruitPage
                fruitName="oranges"
                {...oranges}
                transaction={transaction}
              />
            ) : (
              <Redirect to="/login_page" />
            )
          )}
        />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/welcome_page" />}
        />
      </Switch>
    </Grid>
  </BrowserRouter>
);

ParentView.propTypes = {
  apples: PropTypes.shape({
    inventory: PropTypes.number.isRequired,
    ordersPlaced: PropTypes.number.isRequired,
  }).isRequired,
  oranges: PropTypes.shape({
    inventory: PropTypes.number.isRequired,
    ordersPlaced: PropTypes.number.isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  transaction: PropTypes.func.isRequired,
};

export default ParentView;
