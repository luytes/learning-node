const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

// using mocha as framework
// use supertest to fill gaps

it('should return hello world response', (done) => {
  request(app) // passing express application
  // .get takes url, make assertion, already make request
  .get('/')
  .expect(404)
  .expect((res) => {
    expect(res.body).toInclude({
      error: 'Page not found'
    });
  })
  .end(done); // handles the end by supertest
});

// New test, assert 200, toInclude --> assert that you exist in users array
it('should get the users name', (done) => {
  request(app)
  .get('/users')
  .expect(200)
  .expect((res) => {
    expect(res.body).toInclude({
      name: 'Kevin',
      age: 25
    });
  })
  .end(done);
});
