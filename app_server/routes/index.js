var express = require('express');
var router = express.Router();

const ctrlmenu = require('../controllers/menuitems');
const ctrlothers = require('../controllers/others');

/* menuItems pages */
router.get('/', ctrlmenu.menuList);
router.get('/menu', ctrlmenu.menuInfo);
router.get('/menu/review/new', ctrlmenu.addReview);

/* Other pages */
router.get('/about', ctrlothers.about);


module.exports = router;
