const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const notes = require('./utils/notes');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading HTML');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  // Add note
  if (parsedUrl.pathname === '/add' && req.method === 'GET') {
    const { title, content } = parsedUrl.query;
    notes.addNote(title, content);
    res.end('Note added');
  }

  // View notes
  else if (parsedUrl.pathname === '/view' && req.method === 'GET') {
    const allNotes = notes.getNotes();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allNotes));
  }

  // Delete note
  else if (parsedUrl.pathname === '/delete' && req.method === 'GET') {
    notes.deleteNote(parsedUrl.query.title);
    res.end('Note deleted');
  }

  // Default route
  else {
    res.writeHead(404);
    res.end('Page not found');
  }
});


server.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
