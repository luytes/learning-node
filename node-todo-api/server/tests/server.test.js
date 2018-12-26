const expect = require('expect');
const request = require('supertest');

// importing app from server.js
const {app} = require('./../server.js');
// importing Todo from todo.js
const {Todo} = require('./../models/todo.js');

// make sure db is empty
beforeEach((done) => {
  // remove everything
  Todo.remove({}).then(() => done());
});

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
        Todo.find().then((todos) => {
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
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
