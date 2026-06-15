const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/moviesController');

router.get('/topmovies', moviesController.getAll);
router.get('/topmovies/:id', moviesController.getSingle);
router.post('/topmovies', moviesController.create);
router.put('/topmovies/:id', moviesController.update);
router.delete('/topmovies/:id', moviesController.delete);

module.exports = router;
