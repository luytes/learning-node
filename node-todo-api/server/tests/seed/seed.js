const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  // with auth token
  _id: userOneId,
  email: 'kevin@gmail.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  // without token
  _id: userTwoId,
  email: 'lisa@gmail.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];
// 2 todos
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  // remove everything
  Todo.remove({}).then(() => {
    // insert many, takes an array an inserts all documents into collection
    // takes the const todos
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  // remove everything
  User.remove({}).then(() => {
    // add records, save users and have password hashed
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]) // user 1 and 2 must be successfully saved or error
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
