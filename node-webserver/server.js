const express = require('express');
const hbs = require('hbs');
// create app, call this method:
var app = express();
// takes directory you wanna use for all of your partial files, specify it
hbs.registerPartials(__dirname + '/views/partials');

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

app.listen(3000, () => {
  console.log('Server is up on port 3000');
}); // local host 3000
