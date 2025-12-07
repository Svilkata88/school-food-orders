const Order  = require('../db/indexDB');

async function getAllOrders() {
  try {
    const orders = await Order.findAll({
    });
    return orders;  
  } catch (error) {
    console.error('Error fetching orders:', error);
    return undefined;
  }
}

async function createOrder(orderData) {
  try {
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    return undefined;
  }
}

module.exports = { 
    getAllOrders,
    createOrder
 };