
const fs = require('fs');

var fetchNotes = () =>{
  
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(e){
    return [];
  }
};   


var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note)=>note.title === title);
  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getNote = (title) =>{
  var notes = fetchNotes();
  var noteToFetch = notes.filter((note) => note.title === title);
  return noteToFetch[0];
};



var getAll = () => {
  return fetchNotes();
};


var removeNote = (title) =>{
  console.log('Removing note', title);
  var notes = fetchNotes();
  var filtredNotes = notes.filter((note)=>note.title !== title);
  saveNotes(filtredNotes);
  return notes.length !== filtredNotes.length;
};

var logNote = (note) => {
  debugger;
  console.log('------------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
