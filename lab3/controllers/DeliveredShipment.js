'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const planetAllService = require('../services/planet.all')
const spaceStationAllService = require('../services/SpaceStation.all')
const DeliveredShipmentAllService = require('../services/DeliveredShipment.all')
const DeliveredShipmentCreateService = require('../services/DeliveredShipment.create')
const DeliveredShipmentByIdService = require('../services/DeliveredShipment.byId')
const DeliveredShipmentUpdateService = require('../services/DeliveredShipment.update')
const DeliveredShipmentDeleteService = require("../services/DeliveredShipment.delete");

module.exports = {
    index (req, res) {
        res.render('pages/DeliveredShipment/index')
    },
    async DeliveredShipmentList (req, res) {
        try {
            const DeliveredShipmentList = await DeliveredShipmentAllService()
            res.render('pages/DeliveredShipment/list', { DeliveredShipments: DeliveredShipmentList })
        } catch (error) {
            res.render('pages/DeliveredShipment/list', {
                DeliveredShipments: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createDeliveredShipmentForm (req, res) {
        try {
            const planets = await planetAllService()
            const SpaceStations = await spaceStationAllService()

            res.render('pages/DeliveredShipment/add', {
                planets: planets,
                SpaceStations: SpaceStations,
            })
        } catch (error) {
            res.render('pages/DeliveredShipment/add', {
                planets: [],
                SpaceStations: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    postCreateDeliveredShipment: [
        async (req, res) => {
            const DeliveredShipmentData = req.body
            const planets = await planetAllService()
            const spaceStations = await spaceStationAllService()
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                        await DeliveredShipmentCreateService(DeliveredShipmentData)
                        req.flash('info', `Ticket №"${DeliveredShipmentData.id}" is Added`)
                        res.redirect('/DeliveredShipment/list')
                } catch (error) {
                    res.render('pages/DeliveredShipment/add', {
                        planets: planets,
                        spaceStations: spaceStations,
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/DeliveredShipment/add', {
                    planets: planets,
                    spaceStations: spaceStations,
                    errors: errors.array()
                })
            }
        }
    ],
    async updateDeliveredShipmentForm (req, res, next) {
        try {
            const ticket = await DeliveredShipmentByIdService(req.params.id)
            if (!ticket) {
                const errorServer = new Error('Not found')
                errorServer.status = 404
                next(errorServer)
                return
            }

            const planets = await planetAllService()
            const spaceStations = await spaceStationAllService()

            res.render('pages/DeliveredShipment/update', {
                planets: planets,
                spaceStations: spaceStations,
            })
        } catch (error) {
            const errorServer = new Error(`Internal server error: ${error.message}`)
            errorServer.status = 500
            next(errorServer)
        }
    },
    putUpdateDeliveredShipment: [

        async (req, res, next) => {
            const DeliveredShipmentData = req.body
            const planets = await planetAllService()
            const spaceStations = await spaceStationAllService()

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                try {
                        const updatedDeliveredShipment = await DeliveredShipmentUpdateService(DeliveredShipmentData)
                        req.flash('info', `DeliveredShipment "№${updatedDeliveredShipment.id} " is Updated`)
                        res.redirect('/DeliveredShipment/list')

                } catch (error) {
                    res.render('pages/DeliveredShipment/update', {
                        ticket: {},
                        newDeliveredShipment: DeliveredShipmentData,
                        planets: planets,
                        spaceStations: spaceStations,
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/DeliveredShipment/update', {
                    ticket: {},
                    newDeliveredShipment: DeliveredShipmentData,
                    planets: planets,
                    spaceStations: spaceStations,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteDeliveredShipmentFrom (req, res, next) {
        DeliveredShipmentByIdService(req.params.id)
            .then(DeliveredShipment => {
                if (DeliveredShipment) {
                    res.render('pages/DeliveredShipment/delete', { DeliveredShipment: DeliveredShipment })
                } else {
                    const errorNotFound = new Error('Not found')
                    errorNotFound.status = 404
                    next(errorNotFound)
                }
            })
            .catch(error => {
                const errorServer = new Error(`Internal server error: ${error.message}`)
                errorServer.status = 500
                next(errorServer)
            })
    },
    deleteDeliveredShipment (req, res, next) {
        DeliveredShipmentDeleteService(req.body)
            .then(DeliveredShipment => {
                req.flash('info', `DeliveredShipment "#${DeliveredShipment.id}" is Deleted`)
                res.redirect('/DeliveredShipment/list')
            })
            .catch(error => {
                res.render('pages/DeliveredShipment/delete', {
                    DeliveredShipment: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
