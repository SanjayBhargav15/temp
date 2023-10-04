const express = require('express');
const router = express.Router();
const ctrlMenus = require('../controllers/menuitem');
const ctrlReviews = require('../controllers/reviews');

// menus
router
  .route('/menuitem')
  .get(ctrlMenus.menuList);

router
  .route('/menuitem/:menuid')
  .get(ctrlMenus.menuReadOne) 
  .put(ctrlMenus.menuUpdateOne) 
  .delete(ctrlMenus.menuDeleteOne);

router
  .route('/menuitem/:menuid/reviews')
  .post(ctrlReviews.reviewsCreate);  
  
  router
  .route('/menuitem/:menuid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)  
  .delete(ctrlReviews.reviewsDeleteOne); 

module.exports = router;
