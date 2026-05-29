const { getDatabase } = require('./db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'directors';

async function getAllDirectors() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

async function getDirectorById(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function createDirector(director) {
  const db = getDatabase();
  return db.collection(COLLECTION).insertOne(director);
}

async function updateDirector(id, updatedFields) {
  const db = getDatabase();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFields }
  );
}

async function deleteDirector(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllDirectors, getDirectorById, createDirector, updateDirector, deleteDirector };
