const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5c253456cd78d5aa11288887';

// if (!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
// };

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todo', todo);
// });

// Todo.findOne({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });


// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

User.findById('5c1fb05d867cd01ef983cc31').then((user) => {
  if (!user) {
    return console.log('Unable to find user')

  }

  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
