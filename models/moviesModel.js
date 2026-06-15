const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect'); // Adjust this path if your DB connection file is located elsewhere

/**
 * Retrieves all movie documents from the topmovies collection
 */
async function getAllMovies() {
  try {
    const db = mongodb.getDb().db('movieDB');
    return await db.collection('topmovies').find().toArray();
  } catch (err) {
    console.error('Error in getAllMovies model:', err);
    throw err;
  }
}

/**
 * Retrieves a single movie document by its ID from the topmovies collection
 */
async function getMovieById(id) {
  try {
    const db = mongodb.getDb().db('movieDB');
    return await db.collection('topmovies').findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error('Error in getMovieById model:', err);
    throw err;
  }
}

/**
 * Inserts a new movie document into the topmovies collection
 */
async function createMovie(movieData) {
  try {
    const db = mongodb.getDb().db('movieDB');
    return await db.collection('topmovies').insertOne(movieData);
  } catch (err) {
    console.error('Error in createMovie model:', err);
    throw err;
  }
}

/**
 * Updates an existing movie document by ID in the topmovies collection
 */
async function updateMovie(id, updateData) {
  try {
    const db = mongodb.getDb().db('movieDB');
    // Strip out _id if it accidentally gets passed in the request body to avoid MongoDB immutable errors
    const dataToUpdate = { ...updateData };
    delete dataToUpdate._id;

    return await db.collection('topmovies').updateOne(
      { _id: new ObjectId(id) },
      { $set: dataToUpdate }
    );
  } catch (err) {
    console.error('Error in updateMovie model:', err);
    throw err;
  }
}

/**
 * Deletes a movie document by ID from the topmovies collection
 */
async function deleteMovie(id) {
  try {
    const db = mongodb.getDb().db('movieDB');
    return await db.collection('topmovies').deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error('Error in deleteMovie model:', err);
    throw err;
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
