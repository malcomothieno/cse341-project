const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../models/contactsModel');

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

function validateContactFields(body, requireAll = true) {
  const errors = [];

  if (requireAll) {
    for (const field of REQUIRED_FIELDS) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  if (body.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      errors.push('email must be a valid email address');
    }
  }

  return errors;
}

// GET /contacts — retrieve all contacts
async function getAll(req, res) {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('getAll contacts error:', err);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
}

// GET /contacts/:id — retrieve single contact by ID
async function getOne(req, res) {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error('getOne contact error:', err);
    res.status(400).json({ error: 'Invalid ID or contact not found' });
  }
}

// POST /contacts — create a new contact
async function create(req, res) {
  try {
    const validationErrors = validateContactFields(req.body, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await createContact({ firstName, lastName, email, favoriteColor, birthday });
    res.status(201).json({ message: 'Contact created successfully', id: result.insertedId });
  } catch (err) {
    console.error('create contact error:', err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
}

// PUT /contacts/:id — update a contact
async function update(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const validationErrors = validateContactFields(req.body, false);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const { id } = req.params;
    const result = await updateContact(id, req.body);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    console.error('update contact error:', err);
    res.status(400).json({ error: 'Failed to update contact' });
  }
}

// DELETE /contacts/:id — delete a contact
async function remove(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteContact(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('delete contact error:', err);
    res.status(400).json({ error: 'Failed to delete contact' });
  }
}

module.exports = { getAll, getOne, create, update, remove };
