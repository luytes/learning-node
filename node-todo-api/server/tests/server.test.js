const expect = require('expect');
const request = require('supertest');

// importing app from server.js
const {app} = require('./../server.js');
// importing Todo from todo.js
const {Todo} = require('./../models/todo.js');
// SEEDING
const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

// make sure db is empty
beforeEach((done) => {
  // remove everything
  Todo.remove({}).then(() => {
    // insert many, takes an array an inserts all documents into collection
    // takes the const todos
    return Todo.insertMany(todos);
  }).then(() => done());
});

// DESCRIBE POST
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })

      // calback function
      .end((err, res) => {
        if (err) {
          // return to stop the next lines of codes
          return done(err);
        }
        // find method to fetch everything in that collction (todos)
        Todo.find({text}).then((todos) => {
          // the todo we created should exist and only length 1 because we only added one
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create data with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

// DESCRIBE GET
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
