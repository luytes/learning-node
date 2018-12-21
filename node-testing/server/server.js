const express = require('express');

var app = express();

// http get handler
app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'Todo App v1.0'
  });
});
// GET USER, give user a name and age property
app.get('/users', (req, res) => {
  res.send([{
    name: 'Kevin',
    age: 25
  }, {
    name: 'Felix',
    age: 24
  }, {
    name: 'Lisa',
    age: 29
  }]);
});

// port we are listening on
app.listen(3000);
module.exports.app = app; // accessable from other files
