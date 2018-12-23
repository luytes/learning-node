const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to Mongo database server');
  }
  console.log('Connected to the Mongodb server!');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  // deleteOne (deletes the first one)
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Lisa'}).then((result) => {
  //   console.log(result);
  // })
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5c1e95b0399884dd548b0047')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // db.close();
});
