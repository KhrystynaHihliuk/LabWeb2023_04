const SpaceStation = require('../models/SpaceStation')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        SpaceStation.findById(id, function (err, SpaceStation) {
            if (err) {
                reject(err)
            } else {
                resolve(SpaceStation)
            }
        })
    })
}
