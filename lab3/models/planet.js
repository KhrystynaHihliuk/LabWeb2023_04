const mongoose = require('mongoose')

const Schema = mongoose.Schema

const planetSchema = new Schema({
    name: { type: String, required: true, max: 255 },
    StoreCapacity: { type: Number, required: true, max: 999999 },
    mass: { type: Number, required: true, max: 999999 },
})

module.exports = mongoose.model('Planet', planetSchema, 'planet')
