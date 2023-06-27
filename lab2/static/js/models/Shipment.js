class Shipment extends BaseModel {
    constructor () {
        super('Shipments', 'code')
        this.fields = this.fields.concat(['code','name','weight'])
    }
}
