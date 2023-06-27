const DeliveredShipment = require('../models/DeliveredShipment')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        DeliveredShipment.findById(id, function (err, DeliveredShipment) {
            if (err) {
                reject(err)
            } else {
                resolve(DeliveredShipment)
            }
        })
    })
}
