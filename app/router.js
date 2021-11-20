const { Router } = require('express');

const router = Router();

const recipesController = require('../app/controllers/recipesController');
const usersController = require('../app/controllers/usersController');
const authController = require('../app/controllers/authController');

// Recipes routes
router.get('/recipes', recipesController.showAll);
router.get('/recipes/:id', recipesController.showOne);
router.post('/recipes', recipesController.add);
router.put('/recipes/:id', recipesController.update);
router.delete('/recipes/:id', recipesController.delete);

// Users routes
router.get('/users', usersController.showAll);
router.get('/users/:id', usersController.showOne);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

// Auth routes
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logOut);

module.exports = router;