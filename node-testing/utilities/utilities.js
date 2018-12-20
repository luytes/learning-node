module.exports.add = (a, b) => a + b;

// real world, data best or http request
// async testing
module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000); // if you use more than 1 second, mocha think it's failing
};

module.exports.asyncSquare = (a, callback) => {
  setTimeout(() => {
    callback(a*a);
  }, 1000); // if you use more than 1 second, mocha think it's failing
};

module.exports.square = (x) => x * x;
module.exports.setName = (user, fullName) => {
  var names = fullName.split(' '); // returns an array with ['Kevin', 'Ma']
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};
// mocha-framework for testing
// use --save-dev flag for non-deploy testing on only
