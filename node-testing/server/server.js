const express = require('express');

var app = express();

// http get handler
app.get('/', (req, res) => {
  res.send('Hello world!')
});

// port we are listening on
app.listen(3000);
