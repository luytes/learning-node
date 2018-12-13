const request = require('request');
const key = require('../constants.js');

var geocodeAdress = (address, callback) => { // callback as errorMessage or results
  var encodedAdress = encodeURIComponent(address); // encodeURIComponent encodes spaces as %20

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}&key=` + key.constantapi(),
    json: true
  }, (error, response, body) => { // part of http, request that comes back is the body
    if (error) {
      callback('Cant connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find address');
    } else if (body.status === 'OK') {
      callback(undefined, { // gives me back an object instead of strings
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
      // console.log(`Adress: ${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports = {
  geocodeAdress
}
