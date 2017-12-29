import React, { Component } from 'react';
import { Alert, Button, Grid, Jumbotron, Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const initialState = {
  apples: {
    inventory: 15, ordersPlaced: 0,
  },
  oranges: {
    inventory: 15, ordersPlaced: 0,
  },
  loggedIn: false,
};

class App extends Component {
  state = initialState
  transaction = (event) => {
    const fruit = event.target.id;
    const newInventory = event.target.textContent === 'place order' ? this.state[fruit].inventory - 1 : this.state[fruit].inventory + 1;
    const newOrdersPlaced = event.target.textContent === 'place order' ? this.state[fruit].ordersPlaced + 1 : this.state[fruit].ordersPlaced;
    this.setState({
      [fruit]: {
        inventory: newInventory, ordersPlaced: newOrdersPlaced,
      },
    });
  }

  logIn = () => {
    this.setState({
      loggedIn: true,
    });
  }

  logOut = () => {
    this.setState(initialState);
  }

  render() {
    return (
      <ParentView
        {...this.state}
        logIn={this.logIn}
        logOut={this.logOut}
        transaction={this.transaction}
      />
    );
  }
}

const WelcomePage = () => (
  <Jumbotron>
    <h3 className="text-center">Welcome to Apples and Oranges</h3>
    <p> This is a simple React application created to practice and reinforce
        my skills regarding props passing, ES6, and routing with authorization logic.
    </p>
  </Jumbotron>
);

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

const Navigation = ({ loggedIn }) => {
  const status = loggedIn ? 'LogOut Page' : 'LogIn Page';
  const privateLinks = (
    loggedIn ? (
      [
        <LinkContainer key={1} to="/oranges">
          <NavItem eventKey={2}> Oranges</NavItem>
        </LinkContainer>,
        <LinkContainer key={2} to="/apples">
          <NavItem eventKey={3}>Apples</NavItem>
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
      <Button onClick={handleLogIn} >click here to log {loginButton}</Button>
    </Jumbotron>
  );
};

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

const FruitPage = ({ fruitName, inventory, ordersPlaced, transaction }) => {
  let alertClass;
  let alertMessage;
  const orderButton = inventory > 0 ? <Button id={fruitName} onClick={transaction} bsStyle="warning" bsSize="large" block>place order</Button> : null;

  const setStatus = () => {
    if (inventory > 9) {
      alertClass = 'success';
      alertMessage = '';
    } else if (inventory > 0) {
      alertClass = 'warning';
      alertMessage = 'stock up soon!';
    } else {
      alertClass = 'danger';
      alertMessage = 'out of stock!';
    }
  };
  setStatus();

  return (
    <div>
      <br />
      <Alert bsStyle={alertClass}>{fruitName} inventory: {inventory} {alertMessage}</Alert>
      <Alert bsStyle="info">orders placed: {ordersPlaced} </Alert>
      <br />
      <Button id={fruitName} onClick={transaction} bsStyle="primary" bsSize="large" block>restock</Button>
      {orderButton}
    </div>
  );
};

FruitPage.propTypes = {
  fruitName: PropTypes.string.isRequired,
  inventory: PropTypes.number.isRequired,
  ordersPlaced: PropTypes.number.isRequired,
  transaction: PropTypes.func.isRequired,
};

export default App;
