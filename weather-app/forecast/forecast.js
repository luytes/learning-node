const request = require('request');
const key = require('../constants.js');

var forecastInformation = (latitude, longitude, callback) => { // callback as errorMessage or results
  request({
    url: `https://api.darksky.net/forecast/${key.weatherapi()}/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => { // part of http, request that comes back is the body
    if (!error && response.statusCode === 200) {
      callback(undefined, { // gives me back an object instead of strings
        current_temperature: body.currently.temperature,
        apparent_temperature: body.currently.apparentTemperature,
        latitude: latitude,
        longitude: longitude
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports = {
  forecastInformation
}
