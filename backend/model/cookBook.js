const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
});

const CookBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recipes: {
      type: [RecipeSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CookBook', CookBookSchema);

/* 
  {
    "title": "favouratePasta",
    "description": "this is ifras favourate pastss"
    "recipts": [
        {
          "id":"122342",
          "image":"http://dfgh.img",
          "name": "italia gwalobdfjbsh"

        },
        {
          "id":"44345647",
          "image":"http://3434.img",
          "name": "chineeez avocado pasta"
        }

    ]
  } */
