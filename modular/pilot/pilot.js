'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const io = require('socket.io-client');
const systemConnection = io.connect(`http://localhost:${port}/`);
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

systemConnection.on('new-flight', handleNewFlight);
systemConnection.emit('get-all');
systemConnection.on('flight-arrived', handleFlightArrived);
systemConnection.on('flight', handleFlight);

function handleNewFlight(flightDetails) {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${flightDetails.flightID}' took off`);
    systemConnection.emit('took-off', flightDetails);
  }, 4000);

  setTimeout(() => {
    console.log(`Pilot: flight with ID '${flightDetails.flightID}' has arrived`);
    systemConnection.emit('arrived', flightDetails);
  }, 7000);
}

function handleFlightArrived(flightDetails) {
  console.log(`Pilot: flight with ID '${flightDetails.flightID}' will be deleted`);
  systemConnection.emit('delete', flightDetails.flightID);
}

function handleFlight(flight) {
  const flightId = '332u443673r32yuf463';
  if (flight.id === flightId) {
    console.log("Pilot: Sorry, I didn't catch this flight ID 332u443673r32yuf463");
  }
}
