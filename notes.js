console.log('starting notes.js');
const fs = require('fs');

var fetchNotes = () => {
  try { // try loading in the file, it this fails, it's fine.
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString); // reads the array and parses it
  } catch (e) { // takes error argument, runs if errors in try occurs. The programm isnt gonna work unexpectedly, even if the file doesnt exist or if it contains corrupt data.
    return []; // if there no notes or if the file is not json, we return an empty array
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // makes new text file
};

var addNote = (title, body) => { //anonymous error function
  console.log('Adding Note:', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  }; // created notes array and note object
  var duplicateNotes = notes.filter((note) => note.title === title);
  // filter is an array method that takes a callback, error function, and that callback is getting called with the argument
  if (duplicateNotes.length === 0) {
    // update note
    notes.push(note); // pass item, gets added to end of array. here we pass note object
    saveNotes(notes);
    return note; // return the note object. true if no duplicates, false if cannot push and duplicate xist
  }
};

var getAll = () => {
  console.log('Getting all notes:');
};

var getNote = (title) => {
  console.log('Getting note:', title);
  var notes = fetchNotes();
  var fetchedNotes = notes.filter((note) => note.title === title);
  return fetchedNotes[0]; // if first array item does not exist, else function will say note not found
};

var removeNote = (title) => {
  console.log('Removing note:', title);
  var notes = fetchNotes(); // fetch notes. stores array of all nodes
  var filteredNotes = notes.filter((note) => note.title !== title); // if the title matches, it will not be added to filtered noted
  saveNotes(filteredNotes); // everything except the tite that matches is saved. so it's 'removed', just not saved
  return notes.length !== filteredNotes.length; // if not equal, return true, what we want
};

// DRY DON'T REPEAT YOURSELF

var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote, // same as addNote: addNote
  getAll,
  getNote,
  removeNote,
  logNote
}

// in Terminal enter: node app.js add --title="secrets" --body="This is my secret"
// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New Note';
// }
// module.exports.add = (x,y) => {
//   console.log('Adding those numbers...');
//   // var sum = x + y;
//   // return sum;
//   return x + y
// }
