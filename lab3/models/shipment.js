const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipmentSchema = new Schema({
    code: { type: Number, required: true, max: 999999 },
    name: { type: String, required: true, max: 255 },
    weight: { type: Number, required: true, max: 999999 },
})

module.exports = mongoose.model('Shipment', shipmentSchema, 'shipment')
