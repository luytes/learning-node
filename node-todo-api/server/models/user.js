var mongoose = require('mongoose');
// Create a user
var User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    minlength: 1, // to block empty strings
    trim: true // gets rid of empty space before and after text
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    default: 'Home'
  },
  createdAt: {
    type: Number,
    default: null
  },
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
