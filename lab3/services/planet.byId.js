const Planet = require('../models/planet')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        Planet.findById(id, function (err, planet) {
            if (err) {
                reject(err)
            } else {
                resolve(planet)
            }
        })
    })
}
