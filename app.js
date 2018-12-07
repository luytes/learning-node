console.log('Starting app.js');

const fs = require('fs');
//gets all the fs modules
// const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');

// var res = notes.addNote();

// var add = notes.add(1,2);
// console.log(add);

// console.log(_.isString(true));
// console.log(_.isString('Kevin '));

// var filteredArray = _.uniq(['Kevin']);
// console.log(filteredArray);
// uniq removes all duplicants in an array
// var user = os.userInfo();

// fs.appendFileSync('greetings.txt',`Hello ${user.username}! You are ${notes.age}`)
//tries to append to a file, if it doesnt exist it just creates it with the text Hello World

const argv = yargs.argv; //

var command = process.argv[2];
var command = argv._[0]; // same as above

console.log(process.argv); // array of all the command line arguments passed in
console.log('Command: ', command);
// console.log('Process: ', process.argv);
console.log('Yargs :', argv)

if (command == 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note title taken');
  }
} else if (command == 'list') {
  notes.getAll(); // create the getAll function in notes.js
} else if (command == 'read') {
  notes.getNote(argv.title);
} else if (command == 'remove') {
  //store boolean
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Note recognized');
}


