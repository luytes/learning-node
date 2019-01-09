var mongoose = require('mongoose');

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
  _creator: {
    type: mongoose.Schema.Types.ObjectId, // set up association with user
    required: true
  }
});
// var newTodo = new Todo({
//   text: 'Cook Dinner'
// });
// var newTodo = new Todo({
//   text: 'Cook Dinner',
//   completed: true,
//   completedAt: 123
// });

module.exports = {Todo};
