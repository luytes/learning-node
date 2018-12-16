var asyncAdd = (a, b) => { // returns a var with Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  })
};

asyncAdd(5, 7).then((result) => {
  console.log('Result: ', result);
  return asyncAdd(result, 33); // promise within a promise
}).then((result) => { // chained promises
  console.log('Result: ', result);
}).catch((errorMessage) => { // if any of our promise fails, we use catch. it summarizes all of precious errorMessages
  console.log('Error: ', errorMessage);
})
