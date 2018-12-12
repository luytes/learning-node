const request = require('request');
const fs = require('fs');

const key = require('./constants.js');


request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=' + key.constantapi(),
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});
