let initialOrderNumber = 1;

const getNextOrderNumber = () => initialOrderNumber++;

const orders = {};

const orderRepository = {
  find: orderNumber => {
    return orders[orderNumber];
  },
  create: (products = []) => {
    const orderNumber = getNextOrderNumber();
    orders[orderNumber] = { orderNumber, products };

    return orders[orderNumber];
  }
};

module.exports.orderRepository = orderRepository;
