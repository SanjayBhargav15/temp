/* GET 'home' page */
const menulist = function(req, res){
    res.render('menu', {
      title: 'Our Restaurant Menu',
    pageHeader: {
      title: 'Restaurant',
      strapline: 'Where Every Meal Tells a Story'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    
      dishes: [
        {
          name: 'Spicy Chicken Pasta',
          description: 'A tasty combination of spicy chicken, pasta, and vegetables.',
          price: '$15.99'
        },
        {
          name: 'Margherita Pizza',
          description: 'A classic pizza with tomato, mozzarella, and basil.',
          price: '$10.99'
        },
        {
          name: 'Chocolate Brownie Sundae',
          description: 'A delightful dessert with warm brownie, vanilla ice cream, and chocolate sauce.',
          price: '$8.99'
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
        name: 'Spicy Chicken Pasta',
        description: 'A tasty combination of spicy chicken, pasta, and vegetables.',
        rating: 4,
        price: 10,
      }
    });
  };
  
  /* GET 'Add review' page */
  const addReview = function(req, res){
    res.render('menu-review-form',{
        title: 'Reviews for Spicy Chicken Pasta',
        reviews: [
          {
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
          }
        ]
      });
    };
  module.exports = {
    menulist,
    menuInfo,
    addReview
  };