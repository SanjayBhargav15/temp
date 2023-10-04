/* GET home page */
const about = function(req, res){
    res.render('generic-text', { title: 'About Restaurant' ,
  content:"Welcome to SPY Restaurant, we believe in providing our guests with an exceptional dining experience. Established with a passion for great food and warm hospitality, we aim to create memorable moments for each and every visitor.Our chefs are dedicated to crafting dishes that not only tantalize your taste buds but also showcase the finest ingredients. From signature entrees to delectable desserts, every item on our menu is thoughtfully prepared to delight your senses.We take pride in sourcing our ingredients locally, supporting our community, and ensuring that freshness and quality are never compromised. Our commitment to sustainability and responsible sourcing is at the heart of what we do.The inviting ambiance of our restaurant is designed to make you feel right at home. Whether you're here for a casual meal with friends or a special celebration, we strive to provide a comfortable and welcoming setting.At SPY Restaurant, we value your feedback and continuously strive to improve. Your satisfaction is our priority, and we look forward to serving you time and time again.Thank you for choosing SPY Restaurant . We can't wait to share our passion for food with you."
  });
  };
  
  module.exports = {
    about
  };