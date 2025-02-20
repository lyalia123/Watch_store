const Order = require('../models/Order');
const Watch = require('../models/Watch');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
      if (!req.session.user) return res.redirect('/login');
  
      const { watch_id, quantity } = req.body;
      const watch = await Watch.findById(watch_id);
  
      if (!watch) {
        console.log('Watch not found!');
        return res.status(404).send('Watch not found');
      }
  
      const quantityNumber = parseInt(quantity);
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        return res.status(400).send('Invalid quantity');
      }
  
      const priceNumber = parseFloat(watch.price); 
      if (isNaN(priceNumber)) {
        return res.status(400).send('Invalid price in database');
      }
  
      const total_price = priceNumber * quantityNumber;
  
      await Order.create({
        user_id: new mongoose.Types.ObjectId(req.session.user._id),
        watch_id,
        quantity: quantityNumber,
        total_price,
      });
  
      res.redirect('/watches/home');
    } catch (error) {
      console.error('Order creation failed:', error);
      res.status(500).send('Failed to create order');
    }
};

exports.getOrders = async (req, res) => {
    try {
      if (!req.session.user) return res.redirect('/login');
      const orders = await Order.find({ user_id: new mongoose.Types.ObjectId(req.session.user._id) })
      .populate('watch_id');
      res.render('orders', { orders, user: req.session.user });
    } catch (error) {
      console.error('Failed to load orders:', error);
      res.status(500).send('Server Error');
    }
};

exports.listOrders = async (req, res) => {
  try {
      console.log('Session User:', req.session.user);
      if (!req.session.user) {
          return res.redirect('/login');
      }

      const orders = await Order.find({ user_id: new mongoose.Types.ObjectId(req.session.user._id) })
          .populate('watch_id')
          .populate('user_id');

      console.log('Orders:', orders); 

      res.render('orders', { orders, user: req.session.user });
  } catch (error) {
      console.error('Failed to load orders:', error);
      res.status(500).send('Server Error');
  }
};
