const SpaceStation = require('../models/SpaceStation')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const spaceStation = new SpaceStation({
        name: data.name,
        capacity: data.capacity,
        need: data.need
    })

    return new Promise((resolve, reject) => {
        spaceStation.save(function (err, createdSpaceStation) {
            if (err) {
                reject(err)
            } else {
                resolve(createdSpaceStation)
            }
        })
    })
}
