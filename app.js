console.log('Starting app.js');

const fs = require('fs');
//gets all the fs modules
const os = require('os');
const notes = require('./notes.js')

var res = notes.addNote();

var add = notes.add(1,2);
console.log(add);
// var user = os.userInfo();

// fs.appendFileSync('greetings.txt',`Hello ${user.username}! You are ${notes.age}`)
//tries to append to a file, if it doesnt exist it just creates it with the text Hello World
