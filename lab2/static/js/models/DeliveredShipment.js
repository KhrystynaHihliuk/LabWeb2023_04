class DeliveredShipment extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('DeliveredShipments')
    this.fields = this.fields.concat(['shipment','spaceStationsName', 'planetName'])
  }
}
