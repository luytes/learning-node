// app.js should NOT CARE about anything, just runs the problem

const fs = require('fs');
const geocode = require('./geocode/geocode.js');
const weather = require('./forecast/forecast.js');
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
geocode.geocodeAdress(argv.address, (errorMessage, results) => {
  // errorMessage = string, results contain address lat and long
  // only one at a time, either errorMessage or results
  // weather or not the call succeeded
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.forecastInformation(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.current_temperature}° Celcius. It feels like ${weatherResults.apparent_temperature}° Celcius.`);
      }
    });
  }
});

