const { getDatabase } = require('../db/connect');
const { ObjectId } = require('mongodb');

// Hardcoded to target the 'contacts' collection
const COLLECTION = 'contacts';

async function getAllContacts() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

async function getContactById(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function createContact(contact) {
  const db = getDatabase();
  return db.collection(COLLECTION).insertOne(contact);
}

async function updateContact(id, updatedFields) {
  const db = getDatabase();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFields }
  );
}

async function deleteContact(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };
