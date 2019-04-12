const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Dizy Patel'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Dizy (Dj) Patel'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    email: 'me@example.com',
    phone: '(123) 456-7890',
    name: 'Dizy Patel'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must need to provide an address.'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Error',
    errorMsg: 'Help article not found.',
    name: 'Jay Patel'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorMsg: 'Page not found.',
    name: 'Jay Patel'
  });
});

app.listen(port, () => {
  console.log('Server is running on' + port + ' port...');
});
