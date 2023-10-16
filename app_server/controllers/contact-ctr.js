const contact = function(req, res){
  res.render('generic-text', { 
    title: 'Contact us',
    content: `
      Contact Information:
      Phone Number: 9999-8888-00
      Email: spyrestaurant@gmail.com
      Follow us on Instagram: @Spyrestaurant
    `
  });
};

module.exports = {
  contact
};
