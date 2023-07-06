# airline-system

## Flight Control System

The Flight Control System is a simulated system that manages flights for an airline. It consists of three components: Manager, Pilot, and System. The Manager is responsible for scheduling and monitoring flights, the Pilot receives notifications about scheduled and ongoing flights, and the System acts as the control room, displaying flight details.

## Components

### Manager

The Manager component handles flight scheduling and monitoring. It triggers a 'new-flight' event every 10 seconds, generating random flight details such as airline, pilot, and destination. It logs a statement to the console when a new flight is scheduled and emits the 'new-flight' event with the flight details as the payload. Additionally, it listens for the 'flight-arrived' event and logs a message of appreciation to the pilot when a flight has arrived.

### Pilot

The Pilot component receives notifications about scheduled and ongoing flights. It listens for the 'new-flight' event and after 4 seconds, emits the 'took-off' event with the flight details as the payload. It also logs the status of the flight, including the flight ID. After an additional 3 seconds, it emits the 'arrived' event with the flight details and logs the status of the flight.

### System

The System component acts as the control room, displaying flight details.

### use node system.js to run 

**system.js has been moved out of modular to let the packages work.**


## [Picture-for-console.log](./lab11events.jpg)

# Continue on Lab12 

Now each System,Manager,Pilot show results, photo attached shows the required 

## [Photo-for-Console](./lab12.jpg) 
