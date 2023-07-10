'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const io = require('socket.io-client');
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);

systemConnection.on('new-flight', handleNewFlight);

function handleNewFlight(flightDetails) {
  setTimeout(() => {
    console.log('Pilot: flight with ID \'' + flightDetails.flightID + '\' took off');
    systemConnection.emit('took-off', flightDetails);
  }, 4000);

  setTimeout(() => {
    console.log('Pilot: flight with ID \'' + flightDetails.flightID + '\' has arrived');
    systemConnection.emit('arrived', flightDetails);
    systemConnection.emit('flight-arrived', flightDetails);

  }, 7000);
}
