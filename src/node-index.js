const fetch = require('node-fetch');
const config = require('config');

const apiKey = config.get('clientIdentifier');
const BikeService = require('./bike-service');
const helper = require('./helper');

const bikes = new BikeService(apiKey, fetch);

const restify = require('restify');
const server = restify.createServer();

server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        return next();
    }
);

server.get('/bikesnstuff', respond);

server.listen(config.get('server.port'), () => {
    console.log('%s listening at %s', server.name, server.url);
});

function respond(req, res, next) {
    bikes.getStationAvailability()
        .then(results => res.json(results))
        .catch(err => console.error(err));

    next();
}
