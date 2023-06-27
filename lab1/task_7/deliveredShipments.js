class deliveredShipments {

    #array = new Array()

    constructor( name, planetName, station , deliveryDate) {
        this.name = name;
        this.planetName = planetName;
        this.station = station;
        this.deliveryDate = deliveryDate;

        if (typeof name === 'undefined') {
            this.name = 'Unknown name'
        }
        if (typeof planetName === 'undefined') {
            this.planetName = 'Unknown planetName'
        }
        if (typeof station === 'undefined') {
            this.station = 'Unknown station'
        }
        if (typeof deliveryDate === 'undefined') {
            this.deliveryDate = 'Unknown deliveryDate'
        }

    }
}

module.exports = deliveredShipments;