const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
  },
  reviewText: String,
  createdOn: {type: Date, default: Date.now}
});

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      image: {
        type: String, 
        required: true
      },
      rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
      },
    });
const menuInfoSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image:String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
      },
      availability: {
        type: Boolean,
        default: true
      },
      category: {
        type: String,
        required: true
      },
      menuInfomation :[menuSchema],
      reviews:[reviewSchema]
    });
mongoose.model('menu', menuInfoSchema);