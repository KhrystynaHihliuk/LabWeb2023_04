const SpaceStation = require('../models/SpaceStation')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        SpaceStation.findByIdAndDelete(data.id, function (err, deletedSpaceStation) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedSpaceStation)
            }
        })
    })
}
