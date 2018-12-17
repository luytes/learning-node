const express = require('express');
// create app, call this method:
var app = express();

app.use(express.static(__dirname + '/public'));

// setting up all http rout handlers. register a handler
app.get('/', (request, response) => {
  // response.send('Testing express'); // sending for example a https response
  response.send({
    name: 'Kevin',
    age: 25,
    likes: [
    'coding',
    'Yume'
    ]
  });
});

app.get('/about', (request, response) => {
  response.send('Testing express, about page');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
}); // local host 3000
