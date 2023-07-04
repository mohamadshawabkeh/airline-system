'use strict';

const eventsPool = require('../events');
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

function scheduleNewFlight() {
  const flightId = uuid.v4();
  const pilotName = faker.person.fullName();
  const destination = faker.location.city() + ', ' + faker.location.country();

  const flightDetails = {
    airLine: 'Royal Jordanian Airlines',
    flightID: flightId,
    pilot: pilotName,
    destination: destination
  };

  console.log('Manager: new flight with ID \'' + flightId + '\' has been scheduled');

  eventsPool.emit('new-flight', flightDetails);
}

setInterval(scheduleNewFlight, 10000);

eventsPool.on('flight-arrived', (flightId) => {
  console.log('Manager: We’re greatly thankful for the amazing flight,', flightId.pilot);
});
