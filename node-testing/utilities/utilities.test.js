// mocha runs this file

// On package.json ** = run through every directory and search for files with .test in it
// write 'npm test' for testing
// wrote nodemon --exec 'npm test' for live testing
// since we have specified test-watch script in our package.json, just write 'npm run test-watch'
const utilities = require('./utilities');
const expect = require('expect');
it('should add two numbers', () => {
  var results = utilities.add(33, 11);
  expect(results).toBe(44).toBeA('number');
});

it('should asyncAdd two numbers', (done) => { // done needed for async things
  utilities.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7).toBeA('number');
    done(); // done specified, a second later, callback function is called
  })
})

it('should asyncSquare a number', (done) => { // done needed for async things
  utilities.asyncSquare(4, (square) => {
    expect(square).toBe(16).toBeA('number');
    done(); // done specified, a second later, callback function is called
  })
})


it('should square the number', () => {
  var results = utilities.square(15);
  expect(results).toBe(225).toBeA('number');
  // if (results !== 225) {
  //   throw new Error(`Expected 225, but got ${results}`);
  // }
});

it('should verify first and last name', () => {
  var user = {age: 25,location: 'Berlin'};
  var results = utilities.setName(user, 'Kevin Ma');
  // objects are passed by reference, both will be updated
  expect(results).toInclude({
    firstName: 'Kevin',
    lastName: 'Ma'
  })
});

// Some Test Documentation
it('should expect some values', () => {
  // expect(12).toNotNe(12);
  // for Objects:
  // expect({name: 'Kevin'}).toEqual({name: 'Kevin'});
  // expect([1,2,3,4]).toInclude(1);
  expect({
    name: 'Kevin',
    age: 25,
    location: 'Berlin'
  }).toExclude({
    age: 26
  })
});
