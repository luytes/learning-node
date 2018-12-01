console.log('Starting app.js');

const fs = require('fs');
//gets all the fs modules
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

var res = notes.addNote();

var add = notes.add(1,2);
console.log(add);

console.log(_.isString(true));
console.log(_.isString('Kevin '));

var filteredArray = _.uniq(['Kevin', 1, 'Kevin', 1, 2, 3, 4]);
console.log(filteredArray);
// uniq removes all duplicants in an array
// var user = os.userInfo();

// fs.appendFileSync('greetings.txt',`Hello ${user.username}! You are ${notes.age}`)
//tries to append to a file, if it doesnt exist it just creates it with the text Hello World
