console.log('starting notes.js');
const fs = require('fs');

var addNote = (title, body) => { //anonymous error function
  console.log('Adding Note:', title, body);
  var notes = [];
  var note = {
    title,
    body
  }; // created notes array and note object

  try { // try loading in the file, it this fails, it's fine.
    var notesString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesString); // reads the array and parses it
  } catch (e) { // takes error argument, runs if errors in try occurs. The programm isnt gonna work unexpectedly, even if the file doesnt exist or if it contains corrupt data.

  }

  var duplicateNotes = notes.filter((note) => note.title === title); // filter is an array method that takes a callback (error function) and that callback is getting called with the argument
  if (duplicateNotes.length === 0) {
    // update note
    notes.push(note); // pass item, gets added to end of array. here we pass note object
    fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // makes new text file
  }
};

var getAll = () => {
  console.log('Getting all notes:');
};

var getNote = (title) => {
  console.log('Getting note:', title);
};

var removeNote = (title) => {
  console.log('Removing note:', title);
};

module.exports = {
  addNote, // same as addNote: addNote
  getAll,
  getNote,
  removeNote
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
