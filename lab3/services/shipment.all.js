const Shipment = require('../models/shipment')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        Shipment.find({})
            .exec(function (err, shipments) {
                if (err) {
                    reject(err)
                } else {
                    resolve(shipments)
                }
            })
    })
}
