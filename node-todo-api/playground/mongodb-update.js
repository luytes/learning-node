const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to Mongo database server');
  }
  console.log('Connected to the Mongodb server!');

  // findOneAndUpdate(filter, update, options, callback), returns a promise if no callback is called
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c1fa63820c38ccb53026cc7')
  // }, { // see mongodb update operator
  //   $set: {completed: true}
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c1ea047b55c83e5041433d3')
  }, { // see mongodb update operator
    $inc: {age: 1},
    $set: {name: 'Lisa'}
  }, { // options
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
