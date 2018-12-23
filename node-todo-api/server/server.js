var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// For mongoose:
mongoose.connect('mongodb://localhost:27017/TodoApp');
// statement below, mongoose waiting for the connection before making the query

// Create a model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, // to block empty strings
    trim: true // gets rid of empty space before and after text
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
});

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

// var newTodo = new Todo({
//   text: 'Cook Dinner'
// });
// var newTodo = new Todo({
//   text: 'Cook Dinner',
//   completed: true,
//   completedAt: 123
// });

// User, email
var newUser = new User({
  name: 'Kevin',
  email: 'kevin@123.com',
  age: 25,
  location: 'Zurich',
  createdAt: 123
});

// Update Mongodb
// newTodo.save().then((doc) => {
//   console.log('Saved to do', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save the Todo');
// });
newUser.save().then((doc) => {
  console.log('Saved User', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save User', e);
});
