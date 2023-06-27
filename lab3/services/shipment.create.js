const Shipment = require('../models/shipment')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const shipment = new Shipment({
        code: data.code,
        name: data.name,
        weight: data.weight
    })

    return new Promise((resolve, reject) => {
        shipment.save(function (err, createdShipment) {
            if (err) {
                reject(err)
            } else {
                resolve(createdShipment)
            }
        })
    })
}
