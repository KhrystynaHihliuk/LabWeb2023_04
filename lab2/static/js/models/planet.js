class Planet extends BaseModel {
    constructor () {
        super('planets', 'name')
        this.fields = this.fields.concat(['name', 'StoreCapacity', 'mass'])
    }
}
