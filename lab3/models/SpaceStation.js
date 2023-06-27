const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SpaceStationSchema = new Schema({
    name: { type: String, required: true, max: 255 },
    capacity: { type: Number, required: true, max: 999999 },
    need: { type: String, required: true, max: 255 },
})

module.exports = mongoose.model('SpaceStation', SpaceStationSchema, 'SpaceStation')
