var getUser = (id, callback) => {
  var user = {
    id: 10,
    name: 'Kevin'
  };
  callback(user);
};

getUser(88, (userObject) => {
  console.log(userObject);
});
