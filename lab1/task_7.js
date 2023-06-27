const spaceStation = require('./task_7/spaceStation')
const Planet = require('./task_7/planet')
const Shipment = require('./task_7/shipment')
const deliveredShipments = require('./task_7/deliveredShipments')

const station1 = new spaceStation('Station 1', 'Planet A');
const station2 = new spaceStation('Station 2', 'Planet A');
const planetA = new Planet('Planet A');
planetA.addStation(station1);
planetA.addStation(station2);
console.log(planetA.stations);
const shipment1 = new Shipment('Shipment 1', 100);
const deliveredShipment1 = new deliveredShipments(shipment1,planetA , station1, new Date('2023-03-28'));
shipment1.addDeliveredShipments(deliveredShipment1);

planetA.editStation(0, 'New Station Name', 'New Station Location');
planetA.deleteStation(1);
const searchResult = planetA.searchStation('New Station Name');
console.log(searchResult);

const shipment2 = new Shipment('Shipment 2', 200);
const deliveredShipment2 = new deliveredShipments(shipment2, station2, new Date('2023-03-29'));
shipment2.addDeliveredShipments(deliveredShipment2);
shipment2.editDeliveredShipments(0, new deliveredShipments(shipment2, station2, new Date('2023-03-30')));
shipment2.deleteDeliveredShipments(0);