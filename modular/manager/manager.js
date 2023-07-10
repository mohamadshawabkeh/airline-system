'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const io = require('socket.io-client');
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

systemConnection.on('new-flight', scheduleNewFlight);
systemConnection.on('flight-arrived', handleFlightArrived);

function scheduleNewFlight(flightDetails) {
  console.log(`Manager: new flight with ID '${flightDetails.flightID}' has been scheduled`);
}

function handleFlightArrived(flightDetails) {
  console.log('Manager: We’re greatly thankful for the amazing flight,', flightDetails.pilot);
}

function generateFlightDetails() {
  const flightId = uuid.v4();
  const pilotName = faker.person.fullName();
  const destination = faker.location.city() + ', ' + faker.location.country();

  return {
    airLine: 'Royal Jordanian Airlines',
    flightID: flightId,
    pilot: pilotName,
    destination: destination
  };
}

setInterval(() => {
  const flightDetails = generateFlightDetails();
  systemConnection.emit('new-flight', flightDetails);
}, 10000);
