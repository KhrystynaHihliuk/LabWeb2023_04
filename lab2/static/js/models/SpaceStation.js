class SpaceStation extends BaseModel {
    constructor () {
        super('SpaceStations', 'name')
        this.fields = this.fields.concat(['name', 'capacity','need'])
    }
}
