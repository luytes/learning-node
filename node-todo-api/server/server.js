var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
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

app.listen(3000, () => {
  console.log('Server is up');
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
