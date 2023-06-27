const DeliveredShipment = require('../models/DeliveredShipment')

/**
 * @param {Object} data
 *
 */
module.exports = function (data) {
    const DeliveredShipmentData = {
        planet: data.planet_id,
        spaceStation: data.spaceStation_id,
    }

    return new Promise((resolve, reject) => {
        DeliveredShipment.findByIdAndUpdate(
            data.id,
            { $set: DeliveredShipmentData },
            { new: true },
            function (err, updatedDeliveredShipment) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedDeliveredShipment)
                }
            })
    })
}
