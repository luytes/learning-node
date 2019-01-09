const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// importing app from server.js
const {app} = require('./../server.js');
// importing Todo from todo.js
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

// SEEDING
// make sure db is empty
beforeEach(populateUsers);
beforeEach(populateTodos);

// DESCRIBE POST
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token) // specify x-auth token value through set method
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

// DESCRIBE TODOS ID
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => { // we take the todo property from the body
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should not return todo doc created by other user', (done) => {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    // make sure you get 404 back
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123
    request(app)
      .get(`/todos/123abc`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

// DELETE
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString(); // were trying to remove the second todo
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token) // authenticate as the second user
      .expect(200)
      .expect((res) => { // we take the todo property from the body
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // query database using findById
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
  it('should not remove a todo as the second user', (done) => {
    var hexId = todos[0]._id.toHexString(); // delete the first todo as the second user should not return any documents
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toExist();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
  it('should return 404 if todo not found', (done) => {
    // make sure you get 404 back
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-object ids, not valid', (done) => {
    request(app)
      .delete(`/todos/123abc`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

// UPDATE
describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    //grab id of first item
    var hexId = todos[0]._id.toHexString();
    var newText = "new text";
    // update text, set completed to true
    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: true,
        text: newText
      }) // 200
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
    // verify that response body has text = text you sent in and verify that completed is true and completedAt is a number
  });
  it('should not update the todo as the second user', (done) => {
    //grab id of first item
    var hexId = todos[0]._id.toHexString();
    var newText = "new text";
    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: true,
        text: newText
      })
      .expect(404)
      .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    // grab id of second id, update and set to false
    var hexId = todos[1]._id.toHexString();
    var newText = "new text!!!!";
    // update text, set completed to true
    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: false,
        text: newText
      }) // 200
      .expect(200)
      // text is changed, completed false, completedAt is null .toNotExist
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
// RETURN INVIDUAL AUTHENTICATED USER
describe('GET /users/me', () => {
  // one with auth
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token) // set header
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  // without auth
  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
// SIGN UP ROUTE
describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@gmail.com';
    var password = '123456';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist(); // header in postman with x-auth
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
  }); // fields invalid
  it('should return validation errors if request invalid', (done) => {
    var email = 'example234.com';
    var password = '123';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });
  it('should not create user if email already in use', (done) => {
    var email = users[0].email;
    var password = '123456';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });
});
// LOGIN
describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });
  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token) // set auth equal to token
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } // find user, verify that array has length of 0
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});


