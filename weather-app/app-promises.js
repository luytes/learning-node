const yargs = require('yargs');
const axios = require('axios');
const key = require('./constants.js');


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

// getting adress with lat and long
var encodedAdress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}&key=` + key.constantapi();

// By using axios library, we're able to chain promises easily
axios.get(geocodeUrl).then((response) => { // GET RETURNS A PROMISE!!!
  // success case
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address'); // creates an throw an Error
  }
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/${key.weatherapi()}/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl); // returns a call, get returns another promise
}).then((response) => { // this function is called when the weather data comes back
  var current_temperature = (response.data.currently.temperature - 32) * (5/9);
  var apparent_temperature = (response.data.currently.apparentTemperature - 32) * (5/9);
  console.log(`It's currently ${current_temperature}° Celcius. It feels like ${apparent_temperature}° Celcius.`);
}).catch((e) => { // if error occurs
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(e.message);
  }
}); // http get request. Axios automatically knows how to parse JSON
