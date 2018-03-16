const fetch = require('node-fetch');
const config = require('config');

const apiKey = config.get('clientIdentifier');
const BikeService = require('./bike-service');
const helper = require('./helper');

const bikes = new BikeService(apiKey, fetch);

// Controller
bikes.getStationAvailability()
    .then(helper.printResults)
    .catch(err => console.error(err));
