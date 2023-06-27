const Planet = require('../models/planet')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const planetData = {
        name: data.name,
        StoreCapacity: data.StoreCapacity,
        mass: data.mass
    }

    return new Promise((resolve, reject) => {
        Planet.findByIdAndUpdate(
            data.id,
            { $set: planetData },
            { new: true },
            function (err, updatedPlanet) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedPlanet)
                }
            })
    })
}
