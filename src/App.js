import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert, Button, Grid, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  state = {
    apples: { inventory: 10, ordersPlaced: 0 },
    oranges: { inventory: 10, ordersPlaced: 0 },
  };

  transaction = (event) => {
    const fruit = event.target.id;
    const newInventory = event.target.textContent === 'place order' ? this.state[fruit].inventory - 1 : this.state[fruit].inventory + 1;
    const newOrdersPlaced = event.target.textContent === 'place order' ? this.state[fruit].ordersPlaced + 1 : this.state[fruit].ordersPlaced;
    this.setState({ [fruit]: { inventory: newInventory, ordersPlaced: newOrdersPlaced } });
  }

  render() {
    return <ParentView {...this.state} transaction={this.transaction} />;
  }
}

const ParentView = ({ ...props }) => (
  <BrowserRouter>
    <Grid>
      <h3 className="text-center"> Apples and Oranges </h3>
      <Navigation />
      <Switch>
        <Route
          path="/apples"
          render={() => (
            <Fruit
              fruitName="apples"
              {...props.apples}
              transaction={props.transaction}
            />
          )}
        />
        <Route
          path="/oranges"
          render={() => (
            <Fruit
              fruitName="oranges"
              {...props.oranges}
              transaction={props.transaction}
            />
          )}
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
  transaction: PropTypes.func.isRequired,
};

const Navigation = () => (
  <Navbar>
    <Nav>
      <LinkContainer to="/apples">
        <NavItem eventKey={1}>Apples</NavItem>
      </LinkContainer>
      <LinkContainer to="/oranges">
        <NavItem eventKey={2}> Oranges</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

const Fruit = ({ fruitName, inventory, ordersPlaced, transaction }) => {
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
      <Alert bsStyle={alertClass}>{fruitName} inventory: {inventory} {alertMessage}</Alert>
      <Alert bsStyle="info">orders placed: {ordersPlaced} </Alert>
      <br />
      <Button id={fruitName} onClick={transaction} bsStyle="primary" bsSize="large" block>restock</Button>
      {orderButton}
    </div>
  );
};

Fruit.propTypes = {
  fruitName: PropTypes.string.isRequired,
  inventory: PropTypes.number.isRequired,
  ordersPlaced: PropTypes.number.isRequired,
  transaction: PropTypes.func.isRequired,
};

export default App;
