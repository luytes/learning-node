var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
// send json to our application
app.use(bodyParser.json());

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
