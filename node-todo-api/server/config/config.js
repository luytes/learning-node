var env = process.env.NODE_ENV || 'development';
console.log('env ********', env);
if (env === 'development' || env === 'test') {
  // load in second JSON file --> not part of git repository
  // moved variables to other json file
  var config = require('./config.json');
  var envConfig = config[env]; // store the config variables for the env
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  }); // Object.keys takes an object like env config, gets all the keys and returns them as array
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
// } else if (env === 'test') { // new database TodoAppTest
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
// }
