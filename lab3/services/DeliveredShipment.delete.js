const DeliveredShipment = require('../models/DeliveredShipment')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        DeliveredShipment.findByIdAndDelete(data.id, function (err, deletedDeliveredShipment) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedDeliveredShipment)
            }
        })
    })
}
