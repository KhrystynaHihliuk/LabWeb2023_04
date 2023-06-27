const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipmentSchema = new Schema({
    planet: { type: Schema.Types.ObjectId, ref: 'Planet' },
    spaceStation: { type: Schema.Types.ObjectId, ref: 'SpaceStation'},
})

shipmentSchema.index({ spaceStation: 1, planet: 1 }, { unique: true });

module.exports = mongoose.model('DelShipment', shipmentSchema,'DelShipment')

