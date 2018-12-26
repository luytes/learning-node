// loading in library and connecting to database
// MongoClient let's you connect to mongo server and issue commands to manipulate db
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

// object destructuring -> pull out properties from an object creating variables
// for example var user = {name: 'kevin', age 25};
// var {name} = user;


// now connect and create db with /sthsth...
MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
// if you use mongoDB V3 and above use:
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to Mongo database server');
  }
  console.log('Connected to the Mongodb server!');
  // >V3: const db = client.db('TodoApp');
  // create a collection. insert a document into mongo databse using node.js

  // db.collection('Todos').insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: "Lisa",
  //   age: 25,
  //   location: "Zurich"
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to create a user', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // >V3: client.close();
  db.close();
});
