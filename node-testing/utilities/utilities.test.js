// mocha runs this file

// On package.json ** = run through every directory and search for files with .test in it
// write 'npm test' for testing

const utilities = require('./utilities');
it('should add two numbers', () => {
  var results = utilities.add(33, 11);
  if (results !== 44) {
    throw new Error(`Expected 44, but got ${results}`);
  }
});

it('should square the number', () => {
  var results = utilities.square(15);
  if (results !== 225) {
    throw new Error(`Expected 225, but got ${results}`);
  }
});
