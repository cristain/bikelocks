'use strict';

const url = 'https://oslobysykkel.no/api/v1';

class BikeService {
    /**
     * @see https://developer.oslobysykkel.no
     * @param {string} apiKey Provided by oslobysykkel
     * @param {?Function} fetch To override the browser `fetch` or run in node.js
     */
    constructor(apiKey, fetch) {
        // For both node and browser.
        this.fetch = fetch || window.fetch.bind(window);
        this.GETOptions = createGETOptions(apiKey);
    }

    async getStationAvailability() {
        const [availabilities, stations] = await Promise.all([
            this.getAvailabilities(),
            this.getStations()
        ]);

        return mergeResults(stations, availabilities);
    }

    getStations() {
        return this.fetch(url + '/stations', this.GETOptions)
            .then(stations => stations.json())
            .then(stations => stations.stations);
    }

    getAvailabilities() {
        return this.fetch(url + '/stations/availability', this.GETOptions)
            .then(availabilities => availabilities.json())
            .then(availabilities => availabilities.stations);
    }
}

module.exports = BikeService;

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

const toNamedStations = availabilities => station => {
    const availability = availabilities.find(availablity => availablity.id === station.id);

    availability.stationName = station.title;

    return availability;
};

function mergeResults(stations, availabilities) {
    const results = stations.map(toNamedStations(availabilities));

    return results;
}

function createGETOptions(apiKey) {
    return {
        method: 'GET',
        headers: {
            'Client-Identifier': apiKey
        }
    };
}
