const fetch = require('node-fetch');
const config = require('config');

const BikeService = require('./bike-service');

const apiKey = config.get('clientIdentifier');

const bikes = new BikeService(apiKey, fetch);

// Controller
bikes.getStationAvailability()
    .then(printResults)
    .catch(err => console.error(err));

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Outputs the title, available bikes and available locks from the
 * given json to the console.
 *
 * @param {json} result
 */
function printResults(results) {
    results.forEach(result => {
        console.log('\n');
        console.log('STATION: ' + result.title);
        console.log('BIKES: ' + result.availability.bikes);
        console.log('LOCKS: ' + result.availability.locks);
        console.log('\n');
    });
}
