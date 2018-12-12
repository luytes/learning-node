const request = require('request');
const fs = require('fs');
const key = require('./constants.js');
const yargs = require('yargs');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Adress to fetch weather for',
      string: true // always parse the 'a' as a string!
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(argv);
var encodedAdress = encodeURIComponent(argv.address); // encodeURIComponent encodes spaces as %20

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}&key=` + key.constantapi(),
  json: true
}, (error, response, body) => { // part of http, request that comes back is the body
  console.log(`Adress: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
