class SpaceStation {

    #array = new Array()

    constructor(name, location) {
        this.name = name;
        this.location = location;

        if (typeof name === 'undefined') {
            this.name = 'Unknown name'
        }
        if(typeof location === 'undefined'){
            this.location = 'Unknown location'
        }

    }
}

module.exports = SpaceStation;