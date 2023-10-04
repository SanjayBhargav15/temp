/* GET 'home' page */
const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://witch.cyclic.cloud';
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





const homePageweb = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  
  res.render('menu',{responseBody,message}
  );
};


const menuList = (req, res) => {
  const path = '/api/menuitem';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      let data = [];
      if (statusCode === 200 && body.length) {
        mdata = body.map( (item) => {
          return item;
        });
      }
      homePageweb(req, res, mdata);
    }
  );
};
// const menulist = function(req, res){
//     res.render('menu', {
//       title: 'Item Details',
//     pageHeader: {
//       title: 'Restaurant',
//       strapline: 'Where Every Meal Tells a Story'
//     },
//     sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    
//       dishes: [
//         {
//           name: 'Veg Burger',
//           description: 'A tasty combination of spicy Burger, pasta, and sauce.',
//           price: '150.99',
//           rating: 4,
//           image: '/images/burgar.jpg'
//         },
//         {
//           name: 'Margherita Pizza',
//           description: 'A classic pizza with tomato, mozzarella, and basil.',
//           price: '100.99',
//           rating: 4.5,
//           image: '/images/pizza.jpg'
//         },
//         {
//           name: 'Chocolate Brownie Sundae',
//           description: 'A delightful dessert with warm brownie, vanilla ice cream, and chocolate sauce.',
//           price: '80.99',
//           rating:4.7,
//           image: '/images/choco.jpg'
//         }
//       ] 
//     });
//   };
  
  /* GET 'Location info' page */
  const menuInfo = function(req, res){
    res.render('menu-info', {
        title: 'Our Restaurant menu',
        pageHeader: {
          title: 'Restaurant',
          strapline: 'Where Every Meal Tells a Story'
        },
        sidebar: "Enjoy every moment of bite!!",
        dish: {
          name: 'Veg Burgar',
          availability:true,
        description: 'A tasty combination of spicy Burgar, pasta, and sauce.',
        rating: 4,
        price: 100,
        image: '/images/burgar.jpg',
        reviews: [{
            author: 'John Doe',
            rating: 5,
            timestamp: '12 August 2023',
            reviewText: 'Absolutely delicious!'
          },
          {
            author: 'Jane Smith',
            rating: 4,
            timestamp: '10 August 2023',
            reviewText: 'I loved it, but it could be a bit spicier.'
          }]
        }
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
    menuList,
    menuInfo,
    addReview
  };


