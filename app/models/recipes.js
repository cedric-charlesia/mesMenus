const mongoose = require('mongoose');

const Recipes = mongoose.model(
  "meals",
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String
    },
    category: {
      type: Array,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    prepTime: {
      type: Number
    },
    cookTime: {
      type: Number
    },
    serves: {
      type: Number
    },
    ingredients: {
      type: Array
    },
    link: {
      type: String,
      unique: true
    }
  },
  "recipes"
)

module.exports = Recipes;