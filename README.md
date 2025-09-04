# Notes Management API

A simple REST API for managing notes built with Node.js and Express.

## Features

- ✅ Get all notes
- ✅ Create a new note
- ✅ Get a specific note by ID
- ✅ Update a note by ID
- ✅ Delete a note by ID
- ✅ Automatic timestamps
- ✅ Proper HTTP status codes
- ✅ Error handling
- ✅ Clean code organization

## Installation & Setup

1. Make sure you have Node.js installed on your system
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will automatically find an available port (default: 3000, fallback: 5000, etc.)

## Quick Test

Once the server is running, you can quickly test it:

**Health Check:**
```bash
curl http://127.0.0.1:5000/
```

**Get all notes:**
```bash
curl http://127.0.0.1:5000/notes
```

## API Endpoints

### GET /notes
Get all notes
```bash
# Linux/Mac
curl http://127.0.0.1:5000/notes

# Windows PowerShell
curl http://127.0.0.1:5000/notes
```

### POST /notes
Create a new note
```bash
# Linux/Mac
curl -X POST http://127.0.0.1:5000/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "This is my note content"}'

# Windows PowerShell
curl -Method POST -Uri "http://127.0.0.1:5000/notes" -ContentType "application/json" -Body '{"title": "My Note", "content": "This is my note content"}'
```

### GET /notes/:id
Get a specific note by ID
```bash
# Linux/Mac/Windows
curl http://127.0.0.1:5000/notes/1
```

### PUT /notes/:id
Update a note by ID
```bash
# Linux/Mac
curl -X PUT http://127.0.0.1:5000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Note", "content": "Updated content"}'

# Windows PowerShell
curl -Method PUT -Uri "http://127.0.0.1:5000/notes/1" -ContentType "application/json" -Body '{"title": "Updated Note", "content": "Updated content"}'
```

### DELETE /notes/:id
Delete a note by ID
```bash
# Linux/Mac
curl -X DELETE http://127.0.0.1:5000/notes/1

# Windows PowerShell
curl -Method DELETE -Uri "http://127.0.0.1:5000/notes/1"
```

## Note Structure

```json
{
  "id": 1,
  "title": "My Note",
  "content": "This is my note content",
  "date": "2025-09-03",
  "createdAt": "2025-09-03T10:30:00.000Z",
  "updatedAt": "2025-09-03T10:30:00.000Z"
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
#
# Testing Methods

### Method 1: Command Line (curl)
Use the curl commands shown above in your terminal/PowerShell.

### Method 2: Web Browser
- Health check: `http://127.0.0.1:5000/`
- Get all notes: `http://127.0.0.1:5000/notes`
- Get specific note: `http://127.0.0.1:5000/notes/1`

### Method 3: API Testing Tools
- **Postman**: Import the endpoints and test with a GUI
- **Thunder Client** (VS Code extension): Test directly in VS Code
- **Insomnia**: Another popular API testing tool

## Example Test Flow

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Create your first note:**
   ```bash
   # Windows PowerShell
   curl -Method POST -Uri "http://127.0.0.1:5000/notes" -ContentType "application/json" -Body '{"title": "My First Note", "content": "Hello World!"}'
   ```

3. **View all notes:**
   ```bash
   curl http://127.0.0.1:5000/notes
   ```

4. **Update the note:**
   ```bash
   # Windows PowerShell
   curl -Method PUT -Uri "http://127.0.0.1:5000/notes/1" -ContentType "application/json" -Body '{"title": "Updated Note", "content": "Updated content!"}'
   ```

5. **Delete the note:**
   ```bash
   # Windows PowerShell
   curl -Method DELETE -Uri "http://127.0.0.1:5000/notes/1"
   ```

## Troubleshooting

### Port Already in Use
If you get an "EADDRINUSE" error, the port is already taken. The server will automatically try different ports (3000, 5000, etc.). Check the console output to see which port it's using.

### Common Issues
- Make sure Node.js is installed
- Run `npm install` before starting
- Check that the server is running before testing endpoints
- Use the correct port number shown in the console output