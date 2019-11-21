'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    //trim: true
  },
  type: {
    type: String,
    enum : ['coffee shop', 'bookstore'],
    default: 'coffee shop'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  }  
  },{timestamps: true
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
