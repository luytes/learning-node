console.log('Starting app.js');

const fs = require('fs');
//gets all the fs modules
// const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

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

var command = process.argv[2];
console.log(process.argv); // array of all the command line arguments passed in
console.log('Command: ', command);

if (command == 'add') {
  console.log('Adding new note');
} else if (command == 'list') {
  console.log('Listing all notes');
} else if (command == 'read') {
  console.log('Reading note');
} else if (command == 'remove') {
  console.log('Removing note');
} else {
  console.log('Note recognized');
}


