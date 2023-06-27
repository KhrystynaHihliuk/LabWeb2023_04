const Planet = require('../models/planet')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        Planet.findByIdAndDelete(data.id, function (err, deletedPlanet) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedPlanet)
            }
        })
    })
}
