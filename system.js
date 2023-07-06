'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const ioServer = require('socket.io')(port);

ioServer.on('connection', (socket) => {
  console.log('connected ', socket.id);

  // ioServer.emit('new-flight',handleNewFlight);
  socket.on('new-flight',handleNewFlight);

  socket.on('took-off',handleFlightTookOff);
  socket.on('arrived',handleFlightArrived);
  // socket.on('flight-arrived',handleFlightArrived);

  // ioServer.emit('flight-arrived',handleFlightArrived);
  });

function handleNewFlight(flightDetails) {
  console.log('Flight:', {
    event: 'new-flight',
    time: new Date().toLocaleString(),
    Details: flightDetails
  });
  // ioServer.on('new-flight', flightDetails)

  ioServer.emit('new-flight', flightDetails)

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
  ioServer.emit('flight-arrived', flightDetails)

}
