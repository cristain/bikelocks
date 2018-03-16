'use strict';

exports.printResults = printResults;

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
