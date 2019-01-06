const {SHA256} = require('crypto-js'); // to hash just pass it ino the sha256 function
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123456!';
bcrypt.genSalt(10, (err, salt) => { // genSalt() generate salt to salt password
  bcrypt.hash(password, salt, (err, hash) => { // hashmethode goes thrpugh hashing process
    console.log(hash);
  });
});
var hashedPassword = '$2a$10$81Tq8T/IqE9nvxZGMVNglO6.ovglCrQQc8AWJb8FnSWAnzVVFUBMy';
// bcrypt.compare takes plain hash value and plain value (string here) and let's you know if they are the same
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data  = {
//   id: 10
// };
// var token = jwt.sign(data, '123456'); // takes object data and signs it, creates hash and returns token value
// console.log(token); // 123456 = secret
// var decoded = jwt.verify(token, '123456'); // does the opposite, takes token and secret and makes sure data was not manipulated
// console.log('Decoded: ', decoded);

// var message = "I am user number 3";
// // hash the message
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
// // some data
// var data = {
//   id: 4
// };
// // sending token back to user
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// } // salt the hash --> add something on to the hash that changes the value

// // trying to manipulate
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString(); // don't have access to the salt

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed, do not trust');
// }
