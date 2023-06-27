const DeliveredShipment = require('../models/DeliveredShipment')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const deliveredShipment = new DeliveredShipment({
        planet: data.planet_id,
        spaceStation: data.spaceStation_id,
    })

    return new Promise((resolve, reject) => {
        deliveredShipment.save(function (err, createdDeliveredShipment) {
            if (err) {
                reject(err)
            } else {
                resolve(createdDeliveredShipment)
            }
        })
    })
}
