const fetch = require('node-fetch');
const clientIdentifier = 'your-client-identifier';
const url = 'https://oslobysykkel.no/api/v1';

/**
 * Returns the options to connect to the API
 *
 * @return {Object} Contains the options to connect to the API
*/
function getOptions () {
    return {
        method: 'GET',
        headers: {
            'Client-Identifier': clientIdentifier
        }
    };
}

/**
 * Returns the list of the stations with their available bikes and locks.
 *
 * @return {Object} result Json object containing the name of the stations,
 *      and the available bikes and available locks for each one
*/

async function getStations() {
    try{
        var stations = await fetch(
            (url + '/stations'),
            getOptions()
        );
        var jsonStations = await stations.json();

    } catch (e) {
        console.dir('Error getting the stations');
    }

    try {
        var availability = await fetch(
            (url + '/stations/availability'),
            getOptions()
        );
        var jsonAvailability = await availability.json();

    } catch (e){
        console.dir('Error getting the availability');
    }

    var result = jsonStations.stations.map(
        a => Object.assign(
            a, jsonAvailability.stations.find(
                b => b.id == a.id)
            )
        );

    printResult(result);

    return result;
}

/**
 * Outputs the title, available bikes and available locks from the
 * given json to the console.
 *
 * @param {json} result
 */
function printResult(result) {
    for(var i=0; i<result.length; i++){
        console.log('\nSTATION: ' + result[i].title);
        console.log('BIKES: ' + result[i].availability.bikes);
        console.log('LOCKS: ' + result[i].availability.locks);
    }
}

getStations();
