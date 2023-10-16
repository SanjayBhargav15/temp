const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://sanjay.cyclic.cloud';
}

const showError = (req, res, status) => {
  let title = '';
  let content = '';

  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear, Looks like we can\'t find this page. Sorry';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};

const renderMenuPage = (req, res, responseBody) => {
  let message = null;

  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No menus found!';
    }
  }

  res.render('menu', { responseBody, message });
};

const menuPage = (req, res) => {
  const path = '/api/menuitem';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  request(requestOptions, (err, { statusCode }, body) => {
    let data = [];
    if (statusCode === 200 && body.length) {
      data = body.map(item => item);
    }
    renderMenuPage(req, res, data);
  });
};

const renderMenuInfoPage = (req, res, menuData) => {
  res.render('menu-info', {
    title: 'Our Restaurant menu',
    pageHeader: {
      title: 'Restaurant',
      strapline: 'Where Every Meal Tells a Story'
    },
    sidebar: 'Enjoy every moment of bite!!',
    dish: menuData,
  });
};

const menuInfoPage = (req, res) => {
  const menuId = req.params.menuid; // Assuming you have a parameter for the menu ID
  const path = `/api/menuitem/${menuId}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  request(requestOptions, (err, { statusCode }, body) => {
    if (statusCode === 200) {
      renderMenuInfoPage(req, res, body);
    } else {
      showError(req, res, statusCode);
    }
  });
};

const renderReviewForm = (req, res, menuData) => {
  res.render('menu-review-form', {
    title: `Review ${menuData.name} on Loc8r`,
    pageHeader: { title: `Review ${menuData.name}` },
    error: req.query.err,
  });
};

  /* GET 'Add review' page */
    const addReview = function(req, res){
    res.render('menu-review-form',{
        title: 'Reviews for Veg Manchurian',
        pageHeader: {title: 'Item Review'}
      });
    };
module.exports = {
  menuPage,
  menuInfoPage,
  addReview,
};


