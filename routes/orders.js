const express = require('express');
const isUser = require('../middleware/isUser');
const { 
    getOrdersControler, 
    getCreateOrderControler,
    postCreateOrderControler,  
} = require('../controlers/ordersControler');
const ordersRouter = express.Router();

ordersRouter.get('/', isUser, getOrdersControler);

ordersRouter.get('/create', isUser, getCreateOrderControler)
ordersRouter.post('/create', isUser, postCreateOrderControler);




module.exports = ordersRouter;