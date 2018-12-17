const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
// create app, call this method:
var app = express();
// takes directory you wanna use for all of your partial files, specify it
// how to register middleware:
// 1. set up express static directory
hbs.registerPartials(__dirname + '/views/partials');

// then set up logger
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now} ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// set various express related configurations
app.set('view engine', 'hbs');

// setting up all http rout handlers. register a handler
// router to / == root
app.get('/', (request, response) => {
  // response.send('Testing express'); // sending for example a https response
  // response.send({
  //   name: 'Kevin',
  //   age: 25,
  //   likes: [
  //   'coding',
  //   'Yume'
  //   ]
  // });
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello there',
  });
});

app.get('/about', (request, response) => {
  // response.send('Testing express, about page')
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/maintenance', (request, response) => {
  response.render('maintenance.hbs', {
    pageTitle: 'maintenance!',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); // local host 3000

// heroku tries to start the app, but it doesnt know what the filename is called. intead its starting the "start" in package.json script!
