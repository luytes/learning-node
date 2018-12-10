// use '' instead of "", since JSON already uses ""

// define object and convert into string
// var obj = {
//   name: 'Kevin'
// };
// var stringObj = JSON.stringify(obj); // takes object, and returns json stringified version!
// console.log(typeof stringObj); // typeof tells me of course what type it is
// console.log(stringObj);

// define a string and convert it into an object
// var personString = '{"name": "Kevin", "Age": "25"}'; // JSON object
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
  title: 'Some title',
  body: 'Some body'
};
var originalNoteString = JSON.stringify(originalNote); //IS NOW A STRING

fs.writeFileSync('notes.json', originalNoteString); // write the text file
// read Note
var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
