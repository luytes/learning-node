const mongoose = require('mongoose');
const validator = require('validator');

// Create a user
// var User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     minlength: 1, // to block empty strings
//     trim: true // gets rid of empty space before and after text
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1,
//     unique: true,
//     validate: { // use validator npm through npm install validator
//       validator: validator.isEmail,
//       // validator: (value) => {
//       //   return validator.isEmail(value);
//       // },
//       message: '{VALUE} is not a valid email'
//     }
//   },
//   password: {
//     required: true,
//     minlength: 6,
//     type: String
//   }, // tokens array of objects, where ach object is a login token, below
//   tokens: [{
//     access: {
//       type: String,
//       required: true
//     },
//     token: {
//       type: String,
//       required: true
//     }
//   }],
//   age: {
//     type: Number,
//     required: true
//   },
//   location: {
//     type: String,
//     default: 'Home'
//   },
//   createdAt: {
//     type: Number,
//     default: null
//   },
// });
var User = mongoose.model('User', {
  email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: { // use validator npm through npm install validator
        validator: validator.isEmail,
        // validator: (value) => {
        //   return validator.isEmail(value);
        // },
        message: '{VALUE} is not a valid email'
      }
    },
  password: {
    required: true,
    minlength: 6,
    type: String
  }, // tokens array of objects, where ach object is a login token, below
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
// User, email
// var newUser = new User({
//   name: 'Kevin',
//   email: 'kevin@123.com',
//   age: 25,
//   location: 'Zurich',
//   createdAt: 123
// });
module.exports = {User};
