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
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
// if you use mongoDB V3 and above use:
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to Mongo database server');
  }
  console.log('Connected to the Mongodb server!');
  // >V3: const db = client.db('TodoApp');
  // 'Todos' we want everything from the todos collection
  // toArray gives us back a PROMISE, use THEN
  // get callback and if things go right, print docs
  // basic query data in find({only values with false}), if you want all: no argument

  // db.collection('Todos').find({
  //   _id: new ObjectID('5c1e9480a774b4dc33f66596')
  // }).toArray().then((docs) => {
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch data', err);
  // });
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch data', err);
  });
  db.collection('Users').find({name: 'Lisa'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch data', err);
  });
  // >V3: client.close();
  // db.close();
});
