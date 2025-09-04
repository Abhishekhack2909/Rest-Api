// In-memory storage for notes
let notes = [];
let nextId = 1;

// Helper function to find note by ID
const findNoteById = (id) => {
  return notes.find(note => note.id === parseInt(id));
};

// Helper function to get current date
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// GET /notes - Get all notes
const getAllNotes = (req, res) => {
  res.json(notes);
};

// POST /notes - Create a new note
const createNote = (req, res) => {
  const { title, content } = req.body;

  // Basic validation
  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    });
  }

  const newNote = {
    id: nextId++,
    title,
    content,
    date: getCurrentDate(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

// GET /notes/:id - Get a specific note by ID
const getNoteById = (req, res) => {
  const note = findNoteById(req.params.id);

  if (!note) {
    return res.status(404).json({
      error: 'Note not found'
    });
  }

  res.json(note);
};

// PUT /notes/:id - Update a note by ID
const updateNote = (req, res) => {
  const note = findNoteById(req.params.id);

  if (!note) {
    return res.status(404).json({
      error: 'Note not found'
    });
  }

  const { title, content } = req.body;

  // Basic validation
  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    });
  }

  // Update note
  note.title = title;
  note.content = content;
  note.updatedAt = new Date().toISOString();

  res.json(note);
};

// DELETE /notes/:id - Delete a note by ID
const deleteNote = (req, res) => {
  const noteIndex = notes.findIndex(note => note.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return res.status(404).json({
      error: 'Note not found'
    });
  }

  const deletedNote = notes.splice(noteIndex, 1)[0];
  res.json({
    message: 'Note deleted successfully',
    note: deletedNote
  });
};

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote
};