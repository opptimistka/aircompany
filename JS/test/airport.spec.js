const assert = require('chai').assert;
// const chai = require('chai');


const Plane = require('../Planes/Plane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const experimentalPlane = require('../Planes/ExperimentalPlane');

const Airport = require('../Airport');

const militaryType = require('../models/military-type');
const experimentalType = require('../models/experimental-type');
const classificationLevel = require('../models/classification-level');

describe('Test for airport.js', () => {
  const planes = [
    new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
    new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
    new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
    new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
    new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
    new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
    new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
    new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
    new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, militaryType.bomber),
    new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, militaryType.bomber),
    new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, militaryType.bomber),
    new MilitaryPlane('F-15', 1500, 12000, 10000, militaryType.fighter),
    new MilitaryPlane('F-22', 1550, 13000, 11000, militaryType.fighter),
    new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, militaryType.transport),
    new experimentalPlane('Bell X-14', 277, 482, 500, experimentalType.highAltitude, classificationLevel.secret),
    new experimentalPlane('Ryan X-13 Vertijet', 560, 307, 500, experimentalType.vtol, classificationLevel.topSecret),
  ];
  const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

  it('should have military Planes with transport type', () => {
    const airport = new Airport(planes);
    const transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
    let hasTransportMilitaryPlanes = false;
    for (const militaryPlane of transportMilitaryPlanes) {
      if (militaryPlane.getMilitaryType() === militaryType.transport) {
        hasTransportMilitaryPlanes = true;
        break;
      }
    }
    assert.equal(hasTransportMilitaryPlanes, true);
  });

  it('should check passenger plane with max capacity', () => {
    const airport = new Airport(planes);
    const expectedPlaneWithMaxPassengersCapacity = airport.getMaxPassengerCapacityPlanes();
    assert.isFalse(expectedPlaneWithMaxPassengersCapacity == planeWithMaxPassengerCapacity);
  });


  it('test 3', () => {
    console.log('TEST testGetPassengerPlaneWithMaxLoadCapacity started!');
    const airport = new Airport(planes);
    airport.sortByMaxLoadCapacity();
    const planesSortedByMaxLoadCapacity = airport.getPlanes();
    let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
    for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
      const currentPlane = planesSortedByMaxLoadCapacity[i];
      const nextPlane = planesSortedByMaxLoadCapacity[i + 1];
      if (currentPlane.getMaxLoadCapacity() > nextPlane.getMaxLoadCapacity()) {
        nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
        break;
      }
    }
    assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
  });

  it('testHasAtLeastOneBomberInMilitaryPlanes', () => {
    const airport = new Airport(planes);
    const bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
    let flag = false;
    for (const militaryPlane of bomberMilitaryPlanes) {
      if (militaryPlane.getMilitaryType() === militaryType.bomber) {
        flag = true;
      } else {
        assert.fail('Test failed!');
      }
    }

    // if not failed;
  });

  it('should check that experimentsl planes has classification level higher than unclassified', () => {
    const airport = new Airport(planes);
    const bomberMilitaryPlanes = airport.getExperimentalPlanes();
    let hasUnclassifiedPlanes = false;
    for (const experimentalPlane of bomberMilitaryPlanes) {
      if (experimentalPlane.classificationLevel === classificationLevel.UNCLASSIFIED) {
        hasUnclassifiedPlanes = true;
      }
      assert.isFalse(hasUnclassifiedPlanes);
    }
  });
});
