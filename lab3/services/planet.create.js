const Planet = require('../models/planet')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const planet = new Planet({
        name: data.name,
        StoreCapacity: data.StoreCapacity,
        mass: data.mass
    })

    return new Promise((resolve, reject) => {
        planet.save(function (err, createdPlanet) {
            if (err) {
                reject(err)
            } else {
                resolve(createdPlanet)
            }
        })
    })
}
