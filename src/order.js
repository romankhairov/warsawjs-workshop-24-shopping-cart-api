let initialOrderNumber = 1;

const getNextOrderNumber = () => initialOrderNumber++;

const orders = {};

const orderRepository = {
  find: orderNumber => {
    return orders[orderNumber];
  },
  create: (products = []) => {
    const orderNumber = getNextOrderNumber();
    orders[orderNumber] = { status: 'NEW', orderNumber, products };

    return orders[orderNumber];
  },
  save: order => {
    orders[order.orderNumber] = order;
  }
};

module.exports.orderRepository = orderRepository;
