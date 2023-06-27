const Shipment = require('../models/shipment')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        Shipment.findById(id, function (err, shipment) {
            if (err) {
                reject(err)
            } else {
                resolve(shipment)
            }
        })
    })
}
