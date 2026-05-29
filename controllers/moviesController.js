const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../models/moviesModel');

// Required fields for a movie document (8 fields — exceeds 7-field requirement)
const REQUIRED_FIELDS = ['title', 'genre', 'releaseYear', 'rating', 'durationMinutes', 'language', 'synopsis', 'directorName'];

function validateMovieFields(body, requireAll = true) {
  const errors = [];

  if (requireAll) {
    for (const field of REQUIRED_FIELDS) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  if (body.releaseYear !== undefined) {
    const year = Number(body.releaseYear);
    if (isNaN(year) || year < 1888 || year > new Date().getFullYear() + 5) {
      errors.push('releaseYear must be a valid year (1888 to present+5)');
    }
  }

  if (body.rating !== undefined) {
    const rating = Number(body.rating);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      errors.push('rating must be a number between 0 and 10');
    }
  }

  if (body.durationMinutes !== undefined) {
    const duration = Number(body.durationMinutes);
    if (isNaN(duration) || duration <= 0) {
      errors.push('durationMinutes must be a positive number');
    }
  }

  return errors;
}

// GET /movies
async function getAll(req, res) {
  try {
    const movies = await getAllMovies();
    res.status(200).json(movies);
  } catch (err) {
    console.error('getAll movies error:', err);
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
}

// GET /movies/:id
async function getOne(req, res) {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error('getOne movie error:', err);
    res.status(400).json({ error: 'Invalid ID or movie not found' });
  }
}

// POST /movies
async function create(req, res) {
  try {
    const validationErrors = validateMovieFields(req.body, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const { title, genre, releaseYear, rating, durationMinutes, language, synopsis, directorName } = req.body;
    const result = await createMovie({
      title,
      genre,
      releaseYear: Number(releaseYear),
      rating: Number(rating),
      durationMinutes: Number(durationMinutes),
      language,
      synopsis,
      directorName,
    });

    res.status(201).json({ message: 'Movie created successfully', id: result.insertedId });
  } catch (err) {
    console.error('create movie error:', err);
    res.status(500).json({ error: 'Failed to create movie' });
  }
}

// PUT /movies/:id
async function update(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const validationErrors = validateMovieFields(req.body, false);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const { id } = req.params;
    const result = await updateMovie(id, req.body);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie updated successfully' });
  } catch (err) {
    console.error('update movie error:', err);
    res.status(400).json({ error: 'Failed to update movie' });
  }
}

// DELETE /movies/:id
async function remove(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteMovie(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('delete movie error:', err);
    res.status(400).json({ error: 'Failed to delete movie' });
  }
}

module.exports = { getAll, getOne, create, update, remove };
