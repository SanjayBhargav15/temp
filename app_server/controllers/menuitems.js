/* GET 'home' page */
const menulist = function(req, res){
    res.render('menu', {
      title: 'Item Details',
    pageHeader: {
      title: 'Restaurant',
      strapline: 'Where Every Meal Tells a Story'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    
      dishes: [
        {
          name: 'Veg Burgar',
          description: 'A tasty combination of spicy Burgar, pasta, and sauce.',
          price: '₹15.99',
          rating: 4,
          image: '/images/burgar.jpg'
        },
        {
          name: 'Margherita Pizza',
          description: 'A classic pizza with tomato, mozzarella, and basil.',
          price: '₹10.99',
          rating: 4.5,
          image: '/images/pizza.jpg'
        },
        {
          name: 'Chocolate Brownie Sundae',
          description: 'A delightful dessert with warm brownie, vanilla ice cream, and chocolate sauce.',
          price: '₹8.99',
          rating:4.7,
          image: '/images/choco.jpg'
        }
      ] 
    });
  };
  
  /* GET 'Location info' page */
  const menuInfo = function(req, res){
    res.render('menu-info', {
        title: 'Our Restaurant Menu',
      pageHeader: {
        title: 'Restaurant',
        strapline: 'Where Every Meal Tells a Story'
      },
      sidebar: "Enjoy every moment of bite!!",
      dish: {
        name: 'Veg Burgar',
        description: 'A tasty combination of spicy Burgar, pasta, and sauce.',
        rating: 4,
        price: 10,
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
        // reviews: [
        //   {
        //     author: 'John Doe',
        //     rating: 5,
        //     timestamp: '12 August 2023',
        //     reviewText: 'Absolutely delicious!'
        //   },
        //   {
        //     author: 'Jane Smith',
        //     rating: 4,
        //     timestamp: '10 August 2023',
        //     reviewText: 'I loved it, but it could be a bit spicier.'
        //   }
        // ]
      });
    };
  module.exports = {
    menulist,
    menuInfo,
    addReview
  };