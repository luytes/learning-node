const request = require('request');
const fs = require('fs');

const key = require('./constants.js');


request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=' + key.constantapi(),
  json: true
}, (error, response, body) => { // part of http, request that comes back is the body
  console.log(`Adress: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
