const Shipment = require('../models/shipment')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const shipmentData = {
        code: data.code,
        name: data.name,
        weight: data.weight
    }

    return new Promise((resolve, reject) => {
        Shipment.findByIdAndUpdate(
            data.id,
            { $set: shipmentData },
            { new: true },
            function (err, updatedShipment) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedShipment)
                }
            })
    })
}
