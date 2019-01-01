require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var app = express();
const port = process.env.PORT;
// send json to our application
app.use(bodyParser.json());

// CRUD BELOW

// creating todos, SENDING JSON DATA, select json raw in postman
app.post('/todos', (req, res) => {
  // getting body sent from client
  // create instance of an model
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
// second route, returning all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => { // returns an array
    res.send({todos}) // send object back instead
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/123456 with url parameter
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  // res.send(req.params); // object with key value pairs (id)
  // Validate id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 if not valid
    return res.status(404).send();
  };
  // findById, sucess
  Todo.findById(id).then((todo) => {
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
app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate it
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) { // if no doc
      return res.status(404).send();
    } // if there is, send doc back with 200
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
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
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    } // if exist, send back
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
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
