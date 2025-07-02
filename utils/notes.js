const fs = require('fs');

function getNotes() {
  if (!fs.existsSync('notes.json')) {
    fs.writeFileSync('notes.json', '[]');
  }

  const data = fs.readFileSync('notes.json', 'utf8');
  return JSON.parse(data);
}

function addNote(title, content) {
  const notes = getNotes();
  notes.push({ title, content });
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

function deleteNote(title) {
  let notes = getNotes();
  notes = notes.filter(note => note.title !== title);
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

module.exports = { getNotes, addNote, deleteNote };
