console.log('Starting app: ');

setTimeout(() => {
  console.log('Inside of callback'); // callback function
}, 2000); // after 2000 milliseconds

setTimeout(() => {
  console.log('Second callback');
}, 0); // after 0 milliseconds. BUT printed after the console log below

console.log('Finishing up');
