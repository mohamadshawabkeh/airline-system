'use strict';

const eventsPool = require('./modular/events');
require('./modular/manager/manager');
require('./modular/pilot/pilot');
eventsPool.on('new-flight', handleNewFlight);
eventsPool.on('took-off', handleFlightTookOff);
eventsPool.on('arrived', handleFlightArrived);

function handleNewFlight(flightDetails) {
  console.log('Flight:', {
    event: 'new-flight',
    time: new Date().toLocaleString(),
    Details: flightDetails
  });
}

function handleFlightTookOff(flightDetails) {
  console.log('Flight:', {
    event: 'took-off',
    time: new Date().toLocaleString(),
    Details: flightDetails
  });
}

function handleFlightArrived(flightDetails) {
  console.log('Flight:', {
    event: 'arrived',
    time: new Date().toLocaleString(),
    Details: flightDetails
  });
}
