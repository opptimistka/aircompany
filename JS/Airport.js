const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

const militaryType = require('./models/military-type');
// commented out as never used - const experimentalType = require('./models/experimental-type');

class Airport {
  constructor(planes) {
    this.planes = planes;
  }

  getPassengerPlanes() {
    const passengerPlanes = [];
    this.planes.forEach((plane) => {
      if (plane instanceof PassengerPlane) {
        passengerPlanes.push(plane);
      }
    });
    return passengerPlanes;
  }

  getMilitaryPlanes() {
    const militaryPlanes = [];
    this.planes.forEach((plane) => {
      if (plane instanceof MilitaryPlane) {
        militaryPlanes.push(plane);
      }
    });
    return militaryPlanes;
  }

  getExperimentalPlanes() {
    const experimentalPlanes = [];
    this.planes.forEach((plane) => {
      if (plane instanceof ExperimentalPlane) {
        experimentalPlanes.push(plane);
      }
    });
    return experimentalPlanes;
  }


  getTransportMilitaryPlanes() {
    const transportMilitaryPlanes = [];
    const militaryPlanes = this.getMilitaryPlanes();
    for (let i = 0; i < militaryPlanes.length; i++) {
      if (militaryPlanes[i].getMilitaryType() == militaryType.transport) {
        transportMilitaryPlanes.push(militaryPlanes[i]);
      }
    }
    return transportMilitaryPlanes;
  }


  getBomberMilitaryPlanes() {
    const bomberMilitaryPlanes = [];
    const militaryPlanes = this.getMilitaryPlanes();
    for (let i = 0; i < militaryPlanes.length; i++) {
      if (militaryPlanes[i].getMilitaryType() === militaryType.bomber) {
        bomberMilitaryPlanes.push(militaryPlanes[i]);
      }
    }
    return bomberMilitaryPlanes;
  }


  getMaxPassengerCapacityPlanes() {
    const passengerPlanes = this.getPassengerPlanes();
    let maxPassengerCapacityPlanes = passengerPlanes[0];
    for (let i = 0; i < passengerPlanes.length; i++) {
      if (passengerPlanes[i].getPassengerCapacity() > maxPassengerCapacityPlanes.getPassengerCapacity()) {
        maxPassengerCapacityPlanes = passengerPlanes[i];
      }
    }
    return maxPassengerCapacityPlanes;
  }


  sortByMaxDistance() {
    this.planes.sort((a, b) => (a.getMaxFlightDistance() > b.getMaxFlightDistance()) ? 1 : -1);
    return this;
  }


  sortByMaxSpeed() {
    this.planes.sort((a, b) => (a.getMaxSpeed() > b.getMaxSpeed()) ? 1 : -1);
    return this;
  }

  sortByMaxLoadCapacity() {
    this.planes.sort((a, b) => (a.getMaxLoadCapacity() > b.getMaxLoadCapacity()) ? 1 : -1);
    return this;
  }

  getPlanes() {
    return this.planes;
  }


  static print(planes) {
    return JSON.stringify(planes);
  }
}

module.exports = Airport;
