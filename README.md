Bikelocks
=========

List the bike stations and how many locks and bikes are available at the moment in your terminal.

## Prerequisites

You need to have installed `node` and `yarn`.

### install dependencies
`yarn install`

## Configuration

Copy the config/default.json to local.json and add your client identifier from
https://developer.oslobysykkel.no.

## How see the bike availability
### Server
Go to your console and run the commands:

```bash
# run the node.js version
yarn start
```

The node.js application will start a proxy server to call the bike API.

### Browser

```
# build the browser version
yarn build

# start the server on localhost:3000
yarn server
```

Will render the results in a unordered list.
