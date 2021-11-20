const { Router } = require('express');

const router = Router();

const recipesController = require('../app/controllers/recipesController');
const usersController = require('../app/controllers/usersController');

// Recipes routes
router.get('/recipes', recipesController.showAll);
router.get('/recipes/:id', recipesController.showOne);
router.post('/recipes', recipesController.add);
router.put('/recipes/:id', recipesController.update);
router.delete('/recipes/:id', recipesController.delete);

// Users routes
router.get('/users', usersController.showAll);
router.get('/users/:id', usersController.showOne);
router.post('/register', usersController.add);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

module.exports = router;