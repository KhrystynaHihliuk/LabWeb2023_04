const SpaceStation = require('../models/SpaceStation')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        SpaceStation.find({})
            .exec(function (err, SpaceStation) {
                if (err) {
                    reject(err)
                } else {
                    resolve(SpaceStation)
                }
            })
    })
}
