class StationsOnOrbit extends BaseModel {
    constructor () {
        super('StationsOnOrbit','spaceStationsName')
        this.fields = this.fields.concat(['spaceStationsName', 'planetName'])
    }
}
