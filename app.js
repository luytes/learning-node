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
const titleOptions = {
  describe: 'Title of Note',
  demand: true, // false by default
  alias: 't' // shortcut
};
const bodyOptions = {
  describe: 'Body of Note',
  demand: true, // false by default
  alias: 'b' // shortcut
};

const argv = yargs
  .command('add','Add a new Note',{
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all Notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remvove a note', {
    title: titleOptions
  })
  .help()
  .argv;
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
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command == 'list') {
  var allNotes = notes.getAll(); // create the getAll function in notes.js
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command == 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note title with such name');
  }
} else if (command == 'remove') {
  //store boolean
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Note recognized');
}


