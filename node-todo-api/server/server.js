require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var app = express();
const port = process.env.PORT;
// send json to our application
app.use(bodyParser.json());

// CRUD BELOW

// creating todos, SENDING JSON DATA, select json raw in postman
app.post('/todos', authenticate, (req, res) => { // make private with authenticate
  // getting body sent from client
  // create instance of an model
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id // when we make todo, x-auth token is used to fetch user and user id is stored
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
// second route, returning all todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id // userOne adds todos, userTwo is not able to view them
  }).then((todos) => { // returns an array
    res.send({todos}) // send object back instead
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/123456 with url parameter
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // res.send(req.params); // object with key value pairs (id)
  // Validate id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 if not valid
    return res.status(404).send();
  };
  // findById, sucess
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    // if no, send back 404 with empty body
    if (!todo) {
     return res.status(404).send();
   }
   // if todo, send back
   res.send({todo});
   res.status(400).send();
   // error, 400
  }).catch((e) => {
    res.status(400).send();
  });
});

// GET delete id
app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;
  // validate it
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) { // if no doc
      return res.status(404).send();
    } // if there is, send doc back with 200
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // in body updates will be stored. pick() takes an array of properties!
  var body = _.pick(req.body, ['text', "completed"]); // user should be able to update text and completed
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // check completed value, and use value to set completedAt
  if (_.isBoolean(body.completed) && body.completed) {
    // set body.completedAt
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  // query for updating
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    } // if exist, send back
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => { // prefix -x is custom header, header we are using for jwt scheme
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Middleware function on route to make them private

// require authentication (x-auth) and find user and send it back (id, email)
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  // verify that user exist with that email, then get password and pass through bcrypt compare
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

// LOGGING OUT
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  // tell heroku to "start" in package.json
});
// Update Mongodb
// newTodo.save().then((doc) => {
//   console.log('Saved to do', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save the Todo');
// });
// newUser.save().then((doc) => {
//   console.log('Saved User', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save User', e);
// });
module.exports = {app};
