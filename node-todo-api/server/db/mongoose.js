var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// For mongoose:
mongoose.connect('mongodb://localhost:27017/TodoApp');
// statement below, mongoose waiting for the connection before making the query
module.exports = {mongoose};
