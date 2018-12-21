const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app.js')

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db);
  // create a spy
  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Kevin', 25);
    // expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Kevin', 25);
  });

  it('should call saveUser with user object', () => {
    var email = 'kevin@123.com';
    var password = 123456;

    app.handleSignUp(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
