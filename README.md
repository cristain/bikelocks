Bikelocks
=========

List the bike stations and how many locks and bikes are available at the moment in your terminal.

## Prerequisites

You need to have installed node.

## Configuration

Go to src/index.js and add your key:

```javascript
const clientIdentifier = 'your-client-identifier';
```

Copy the config/default.json to local.json and add your client identifier from
https://developer.oslobysykkel.no.

## How see the list

Go to your console and run the commands:

```bash
# install dependencies
yarn install
# run the code
yarn start
```

The application will print the list of stations and how many locks and bikes are available.
