const express = require('express');
const router = express.Router();

// Import your movies controller
const moviesController = require('../controllers/moviesController'); 

// --------------------------------------------------
// MOVIE ROUTES (Mapped exactly to /topmovies)
// --------------------------------------------------

// GET: Retrieve all movies
router.get('/topmovies', moviesController.getAll);

// GET: Retrieve a single movie by ID
router.get('/topmovies/:id', moviesController.getOne);

// POST: Create a new movie document
router.post('/topmovies', moviesController.create);

// PUT: Update an existing movie document by ID
router.put('/topmovies/:id', moviesController.update);

// DELETE: Remove a movie document by ID
router.delete('/topmovies/:id', moviesController.remove);

module.exports = router;
