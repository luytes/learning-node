console.log('starting notes.js');
const fs = require('fs');

var addNote = (title, body) => { //anonymous error function
  console.log('Adding Note:', title, body);
  var notes = [];
  var note = {
    title,
    body
  }; // created notes array and note object

  notes.push(note); // pass item, gets added to end of array. here we pass note object
  fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // makes new text file
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
