import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

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

export default FruitPage;
