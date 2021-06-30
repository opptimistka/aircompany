const Plane = require('./Plane');

class PassengerPlane extends Plane {


    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity, passengerCapacity) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
        this.passengerCapacity = passengerCapacity;
    }

    getPassengerCapacity() {
        return this.passengerCapacity;
    }

}

module.exports = PassengerPlane;