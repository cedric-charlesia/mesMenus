const Recipes = require('../models/recipes');

exports.show = async (req, res) => {

  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.add = async (req, res) => {

  console.log(req.body);

  try {
    const newRecipe = await Recipes.create({
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      origin: req.body.origin,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      serves: req.body.serves,
      ingredients: req.body.ingredients,
      link: req.body.link
    });
    // console.log(newRecipe);
    res.json(newRecipe);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.update = async (req, res) => {

  const recipeId = req.params.id;

  try {
      const updatedRecipe = await Recipes.findByIdAndUpdate(recipeId, {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        origin: req.body.origin,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        serves: req.body.serves,
        ingredients: req.body.ingredients,
        link: req.body.link
      }, {
        new: true
      });
    // console.log(updatedRecipe);
    res.json(updatedRecipe);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.delete = async (req, res) => {

  const recipeId = req.params.id;

  try {
      const removedRecipe = await Recipes.findByIdAndRemove(recipeId);
    // console.log(`La recette a bien été supprimée`);
    res.send(`La recette ${recipeId} a bien été supprimée`);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
}