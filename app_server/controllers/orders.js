const mongoose = require('mongoose');
require('../models/order-models');
require('../../app_api/models/menu-models');
const Order = mongoose.model('Order');
const Menu = mongoose.model('menu');

const showOrderForm = (req, res) => {
  res.render('orders');
};

const placeOrder = async (req, res) => {
  const { name, phno, dish, quantity, notes, address,totalPrice } = req.body;
  
    try {
      const orders = [];
      if (Array.isArray(dish) && Array.isArray(quantity)) {
        for (let i = 0; i < dish.length; i++) {
          const order = new Order({
            name,
            phno,
            dish: dish[i],
            quantity: quantity[i],
            notes,
            address,
            totalPrice
          });
          orders.push(order);
        }
      } else {
        const order = new Order({
          name,
          phno,
          dish,
          quantity,
          notes,
          address,
          notes,
          totalPrice
        });
        orders.push(order);
      }
  
      await Order.insertMany(orders);
  
      res.redirect('/'); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

const orderForm = async (req, res) => {
    try {
      const availableDishes = await Menu.find({ availability: true }, 'name price'); 
  
      res.render('orders', { availableDishes });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

module.exports = {
  showOrderForm,
  placeOrder,
  orderForm
};
