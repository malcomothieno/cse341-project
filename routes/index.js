const express = require('express');
const router = express.Router();
const contactsRouter = require('./contacts');

// Welcome message at root
router.get('/', (req, res) => {
  res.send('Contacts API — visit /api-docs for Swagger documentation.');
});

// Mount contacts sub-router
router.use('/contacts', contactsRouter);

module.exports = router;
