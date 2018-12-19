module.exports.add = (a, b) => a + b;
module.exports.square = (x) => x * x;
module.exports.setName = (user, fullName) => {
  var names = fullName.split(' '); // returns an array with ['Kevin', 'Ma']
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};
// mocha-framework for testing
// use --save-dev flag for non-deploy testing on only
