(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports = exports = window.fetch;
exports.Headers = window.Headers;
exports.Request = window.Request;
exports.Response = window.Response;

},{}],2:[function(require,module,exports){
const fetch = require('node-fetch');
const clientIdentifier = 'eae896e24cf4f378a8c381c66d671233';
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

},{"node-fetch":1}]},{},[2]);
