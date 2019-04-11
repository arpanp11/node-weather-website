const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYXJwYW5wMTUiLCJhIjoiY2p0dzNwaG8yMWFucDRlbXBldXdoN2t0ZCJ9.0OBNrX0HlMYkDhz_WLA6Tg';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect Geolocation server.', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try onther location.', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
