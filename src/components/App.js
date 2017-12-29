import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React, { Component } from 'react';
import ParentView from './ParentView';

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

export default App;
