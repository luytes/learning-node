var getUser = (id, callback) => {
  var user = {
    id: 10,
    name: 'Kevin'
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(88, (userObject) => {
  console.log(userObject);
});
