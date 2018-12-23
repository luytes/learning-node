var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// For mongoose:
mongoose.connect('mongodb://localhost:27017/TodoApp');
// statement below, mongoose waiting for the connection before making the query

// Create a model
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  },
});

// var newTodo = new Todo({
//   text: 'Cook Dinner'
// });
var newTodo = new Todo({
  text: 'Cook Dinner',
  completed: true,
  completedAt: 123
});

// Update Mongodb
newTodo.save().then((doc) => {
  console.log('Saved to do', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save the Todo');
});
