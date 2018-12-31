const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) remove everything:
// Todo.remove({}).then((result) => {
//   console.log(result);
// });
// remove the first

// Todo.findOneAndRemove() more query possible
// Todo.findByIdAndRemove({_id: '5c2a7e9d4999f45a6ea6fc19'}).then((todo) => {
//   console.log(todo);
// });

// Todo.findByIdAndRemove()
Todo.findByIdAndRemove('5c2a7e9d4999f45a6ea6fc19').then((todo) => {
  console.log(todo);
});
