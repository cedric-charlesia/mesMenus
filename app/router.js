const { Router } = require('express');

const router = Router();

const recipesController = require('../app/controllers/recipesController')

router.get('/recipes', recipesController.show);

router.post('/recipes', recipesController.add);

router.put('/recipes/:id', recipesController.update);

router.delete('/recipes/:id', recipesController.delete);

module.exports = router;