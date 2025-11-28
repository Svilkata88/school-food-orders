const { getAllOrders, createOrder } = require('../services/ordersServices');
const { getUserFromToken } = require('../services/utils');


async function getOrdersControler (req, res) {
    const orders = await getAllOrders();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('orders', { title: 'Orders', message: 'Your Orders', orders, currentUser }); 
};

function getCreateOrderControler (req, res) {
   return res.render('create-order', { title: 'Create Order', message: 'Create a New Order' });
}

async function postCreateOrderControler (req, res) {
    const orderData = req.body;
    const newOrder = await createOrder(orderData);
    if (newOrder) {
        res.redirect('/orders');
    } else {
        console.log('Error creating order');
        return undefined
    }
}

module.exports = { 
    getOrdersControler,
    getCreateOrderControler,
    postCreateOrderControler, 
};