'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const ioServer = require('socket.io')(port);
const uuid = require('uuid').v4;

const queue = {
  flights: {}
};

ioServer.on('connection', (socket) => {
  console.log('connected ', socket.id);

  socket.on('new-flight', handleNewFlight);
  socket.on('took-off', handleFlightTookOff);
  socket.on('arrived', handleFlightArrived);
  socket.on('get-all', () => getAllHandler);
  socket.on('delete', handleDelete);

});

function handleNewFlight(flightDetails) {
  const id = uuid();
  const flight = {
    event: 'new-flight',
    details: {
      time: new Date().toLocaleString(),
      id: id,
      pilot: flightDetails.pilot,
      destination: flightDetails.destination
    }
  };
  queue.flights[id] = flightDetails;
  console.log('Flight:', flight);
  ioServer.emit('new-flight', flightDetails);
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
  ioServer.emit('flight-arrived', flightDetails);
  console.log('Queue before delete:', queue);

  // delete queue.flights[flightDetails.id];
}

function getAllHandler() {
  Object.keys(queue.flights).forEach((id) => {
    socket.emit('flight', {
      id: id,
      details: queue.flights[id]
    });
  });
}

function handleDelete(flightId) {
  delete queue.flights[flightId];
  queue.flights = {};
  console.log('Queue deleted!');
  console.log('Queue:', queue.flights);
}
