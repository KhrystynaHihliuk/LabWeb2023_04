const Planet = require('../models/planet')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        Planet.find({})
            .exec(function (err, planets) {
                if (err) {
                    reject(err)
                } else {
                    resolve(planets)
                }
            })
    })
}
