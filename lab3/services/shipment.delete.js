const Shipment = require('../models/shipment')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        Shipment.findByIdAndDelete(data.id, function (err, deletedShipment) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedShipment)
            }
        })
    })
}
