import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div style={{ padding: 50 }}>
      <h3> Apples and Oranges </h3>
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
    </div>
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
  <nav>
    <Link to="/apples">Apples</Link>
    <br />
    <Link to="/oranges">Oranges</Link>
    <hr />
  </nav>
);

const Fruit = ({ fruitName, inventory, ordersPlaced, transaction }) => {
  const inventoryStatus = inventory > 9 ? 'good' : inventory > 0 ? 'stock up soon!' : 'out of stock!';
  const orderButton = inventory > 0 ? <button id={fruitName} onClick={transaction}>place order</button> : null;

  return (
    <div>
      <h3>{fruitName} inventory status: {inventoryStatus}</h3>
      <li>in stock: {inventory} </li>
      <li>orders placed: {ordersPlaced} </li>
      <br />
      {orderButton}
      <br />
      <button id={fruitName} onClick={transaction}>restock</button>
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
