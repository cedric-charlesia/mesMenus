const { Router } = require('express');

const router = Router();

const recipesController = require('../app/controllers/recipesController');
const usersController = require('../app/controllers/usersController');

// Recipes routes
router.get('/recipes', recipesController.show);
router.post('/recipes', recipesController.add);
router.put('/recipes/:id', recipesController.update);
router.delete('/recipes/:id', recipesController.delete);

// Users routes
router.get('/users', usersController.show);
router.post('/register', usersController.add);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

module.exports = router;