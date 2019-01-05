const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// stores schema for user (all properties)
var UserSchema = new mongoose.Schema({
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

// Ovewrite method
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject(); // takes mongoose variable and convert into regular object where only property available on document exist
  return _.pick(userObject, ['_id', 'email']);
};
// instance methods
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, '123456').toString();
  // user.tokens.push({access, token});
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};
// statics is object where everything you add onto it turns into a model method instead of intead method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, '123456');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  } // success
  return User.findOne({ // query nested object properties
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);
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

// User, email
// var newUser = new User({
//   name: 'Kevin',
//   email: 'kevin@123.com',
//   age: 25,
//   location: 'Zurich',
//   createdAt: 123
// });
module.exports = {User};
