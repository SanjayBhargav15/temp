var express = require('express');
var router = express.Router();

const ctrlmenu = require('../controllers/menuitems');
const ctrlothers = require('../controllers/others');
const ctrlcontact = require('../controllers/contact-ctr')
const ctrlOrders = require('../controllers/orders');

/* menuItems pages */
router.get('/', ctrlmenu.menuPage);
// router.get('/menu', ctrlmenu.menuInfo);
router.get('/menu/:menuid', ctrlmenu.menuInfoPage);
router.get('/menu/review/new', ctrlmenu.addReview);

/* Other pages */
router.get('/about', ctrlothers.about);

router.get('/contact', ctrlcontact.contact);

router.route('/orders')
  .get(ctrlOrders.orderForm)
  .get(ctrlOrders.showOrderForm)
  .post(ctrlOrders.placeOrder);

module.exports = router;
