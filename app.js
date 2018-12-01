console.log('Starting app');

const fs = require('fs');
//gets all the fs modules
const os = require('os');

var user = os.userInfo();

fs.appendFileSync('greetings.txt',`Hello ${user.username}!`)
//tries to append to a file, if it doesnt exist it just creates it with the text Hello World
