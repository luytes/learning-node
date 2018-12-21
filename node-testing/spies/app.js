var db = require('./db.js');

module.exports.handleSignUp = (email, password) => {
  // Check if the email already exists
  // Save user to the database
  db.saveUser({
    email: email,
    password: password
  });
  // Send welcome email

}
