const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
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
  }
);

const Recipes = mongoose.model("recipes", recipeSchema);

module.exports = Recipes;