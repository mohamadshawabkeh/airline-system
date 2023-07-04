'use strict';

const eventsPool = require('../events');

eventsPool.on('new-flight', handleNewFlight);

function handleNewFlight(flightDetails) {
  setTimeout(() => {
    console.log('Pilot: flight with ID \'' + flightDetails.flightID + '\' took off');
    eventsPool.emit('took-off', flightDetails);
  }, 4000);

  setTimeout(() => {
    console.log('Pilot: flight with ID \'' + flightDetails.flightID + '\' has arrived');
    eventsPool.emit('arrived', flightDetails);
    eventsPool.emit('flight-arrived', flightDetails);

  }, 7000);
}
