const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// GET /notes - Get all notes
router.get('/', notesController.getAllNotes);

// POST /notes - Create a new note
router.post('/', notesController.createNote);

// GET /notes/:id - Get a specific note by ID
router.get('/:id', notesController.getNoteById);

// PUT /notes/:id - Update a note by ID (bonus)
router.put('/:id', notesController.updateNote);

// DELETE /notes/:id - Delete a note by ID
router.delete('/:id', notesController.deleteNote);

module.exports = router;