// API Configuration
const API_BASE_URL = 'http://127.0.0.1:5000';

// DOM Elements
const noteForm = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');
const refreshBtn = document.getElementById('refreshBtn');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const statusMessage = document.getElementById('statusMessage');

// Current editing note ID
let currentEditId = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    noteForm.addEventListener('submit', handleAddNote);
    refreshBtn.addEventListener('click', loadNotes);
    editForm.addEventListener('submit', handleEditNote);
    
    // Modal controls
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancelEdit').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeModal();
        }
    });
}

// API Functions
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        showStatus('Failed to connect to API. Make sure the server is running.', 'error');
        throw error;
    }
}

// Load and display notes
async function loadNotes() {
    try {
        const notes = await apiRequest('/notes');
        displayNotes(notes);
    } catch (error) {
        console.error('Failed to load notes:', error);
    }
}

// Display notes in the UI
function displayNotes(notes) {
    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <h3>📝 No notes yet</h3>
                <p>Create your first note using the form above!</p>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = notes.map(note => `
        <div class="note-card" data-id="${note.id}">
            <div class="note-header">
                <h3 class="note-title">${escapeHtml(note.title)}</h3>
                <div class="note-actions">
                    <button class="btn btn-edit" onclick="openEditModal(${note.id})">✏️ Edit</button>
                    <button class="btn btn-danger" onclick="deleteNote(${note.id})">🗑️ Delete</button>
                </div>
            </div>
            <div class="note-content">${escapeHtml(note.content)}</div>
            <div class="note-meta">
                <div>Created: ${formatDate(note.createdAt)}</div>
                ${note.updatedAt !== note.createdAt ? `<div>Updated: ${formatDate(note.updatedAt)}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// Handle adding new note
async function handleAddNote(e) {
    e.preventDefault();
    
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    if (!title || !content) {
        showStatus('Please fill in both title and content', 'error');
        return;
    }
    
    try {
        await apiRequest('/notes', {
            method: 'POST',
            body: JSON.stringify({ title, content })
        });
        
        // Clear form
        noteForm.reset();
        
        // Reload notes
        await loadNotes();
        
        showStatus('Note created successfully!', 'success');
    } catch (error) {
        showStatus('Failed to create note', 'error');
    }
}

// Open edit modal
async function openEditModal(id) {
    try {
        const note = await apiRequest(`/notes/${id}`);
        
        currentEditId = id;
        document.getElementById('editTitle').value = note.title;
        document.getElementById('editContent').value = note.content;
        
        editModal.style.display = 'block';
    } catch (error) {
        showStatus('Failed to load note for editing', 'error');
    }
}

// Handle editing note
async function handleEditNote(e) {
    e.preventDefault();
    
    if (!currentEditId) return;
    
    const title = document.getElementById('editTitle').value.trim();
    const content = document.getElementById('editContent').value.trim();
    
    if (!title || !content) {
        showStatus('Please fill in both title and content', 'error');
        return;
    }
    
    try {
        await apiRequest(`/notes/${currentEditId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content })
        });
        
        closeModal();
        await loadNotes();
        
        showStatus('Note updated successfully!', 'success');
    } catch (error) {
        showStatus('Failed to update note', 'error');
    }
}

// Delete note
async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }
    
    try {
        await apiRequest(`/notes/${id}`, {
            method: 'DELETE'
        });
        
        await loadNotes();
        showStatus('Note deleted successfully!', 'success');
    } catch (error) {
        showStatus('Failed to delete note', 'error');
    }
}

// Close modal
function closeModal() {
    editModal.style.display = 'none';
    currentEditId = null;
    editForm.reset();
}

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type} show`;
    
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 3000);
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}