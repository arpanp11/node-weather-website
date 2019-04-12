const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/e33a9b2c6542960c4a53c071a5d431ae/' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find the location.', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degree out. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.' +
          'The wind speed is a ' +
          body.daily.data[0].windSpeed +
          ' mph. There is a ' +
          body.daily.data[0].humidity +
          '% humidity.'
      );
    }
  });
};

module.exports = forecast;
