class Planet{

    #array = new Array()

    constructor(name) {
        this.name = name;
        this.stations = [];

        if (typeof name === 'undefined') {
            this.name = 'Unknown name'
        }

    }

    addStation(station) {
        this.stations.push(station);
    }

    editStation(stationIndex, newName, newLocation) {
        const station = this.stations[stationIndex];
        station.name = newName;
        station.location = newLocation;
    }

    deleteStation(stationIndex) {
        this.stations.splice(stationIndex, 1);
    }

    searchStation(stationName) {
        return this.stations.find(station => station.name === stationName);
    }
}

module.exports = Planet;