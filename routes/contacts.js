const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/contactsController');

// GET /contacts
router.get('/', getAll);

// GET /contacts/:id
router.get('/:id', getOne);

// POST /contacts
router.post('/', create);

// PUT /contacts/:id
router.put('/:id', update);

// DELETE /contacts/:id
router.delete('/:id', remove);

module.exports = router;
