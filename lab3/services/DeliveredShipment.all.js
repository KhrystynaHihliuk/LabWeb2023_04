const DeliveredShipment = require('../models/DeliveredShipment')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        DeliveredShipment.find({})
            .exec(function (err, DeliveredShipment) {
                if (err) {
                    reject(err)
                } else {
                    resolve(DeliveredShipment)
                }
            })
    })
}
