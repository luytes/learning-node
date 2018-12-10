// var square = (x) => {
//   var result = x * x;
//   return result;
// };
// console.log(square(9));

// the same as

var square = (x) => x * x;
console.log(square(9));

//
var user = {
  name: 'Kevin',
  sayHi: () => { // arrow function
    console.log(`Hi, I am ${this.name}`);
  },
  sayHiAlt () { // regular function, not an arrow
    console.log(arguments); // only works here, this binding does not work
    console.log(`Hi, I am ${this.name}`);
  }
};
user.sayHi();
user.sayHiAlt(1, 2, 3);
