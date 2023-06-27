class Shipment {

    constructor(name, weight) {

        this.name = name;
        this.weight = weight;
        this.deliveredShipments = [];

        if (typeof name === 'undefined') {
            this.name = 'Unknown name'
        }
        if (typeof weight === 'undefined') {
            this.weight = 'Unknown weight'
        }

    }

    addDeliveredShipments(deliveredShipments) {
        this.deliveredShipments.push(deliveredShipments);
    }

    editDeliveredShipments(deliveredShipmentsIndex, newDeliveredGoods) {
        this.deliveredShipments[deliveredShipmentsIndex] = newDeliveredGoods;
    }

    deleteDeliveredShipments(deliveredShipmentsIndex) {
        this.deliveredShipments.splice(deliveredShipmentsIndex, 1);
    }
}

module.exports = Shipment;