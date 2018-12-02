console.log('starting notes.js');

module.exports.addNote = () => {
  console.log('addNote');
  return 'New Note';
}
module.exports.add = (x,y) => {
  console.log('Adding those numbers...');
  // var sum = x + y;
  // return sum;
  return x + y
}
