const express = require('express');
const { createOrder, listOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders/add', createOrder);
router.get('/orders', listOrders); 

module.exports = router;
