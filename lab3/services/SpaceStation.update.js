const SpaceStation = require('../models/SpaceStation')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const spaceStationData = {
        name: data.name,
        capacity: data.capacity,
        need: data.need,
    }

    return new Promise((resolve, reject) => {
        SpaceStation.findByIdAndUpdate(
            data.id,
            { $set: spaceStationData },
            { new: true },
            function (err, updatedSpaceStation) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedSpaceStation)
                }
            })
    })
}
