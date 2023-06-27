'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shipmentListService = require('../services/shipment.all')
const shipmentCreateService = require('../services/shipment.create')
const shipmentByIdService = require("../services/shipment.byId");
const shipmentDeleteService = require("../services/shipment.delete");
const shipmentUpdateService = require("../services/shipment.update");

module.exports = {
    index (req, res) {
        res.render('pages/shipment/index')
    },
    async shipmentList (req, res) {
        try {
            const shipmentList = await shipmentListService()
            res.render('pages/shipment/list', {
                shipments: shipmentList
            })
        } catch (error) {
            res.render('pages/shipment/list', {
                shipments: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createShipmentForm (req, res) {
        res.render('pages/shipment/add')
    },
    postCreateShipment: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('code')
            .isLength({ min: 1 }).trim().withMessage('code field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('code').escape(),
        async (req, res) => {
            // const success = true
            const shipmentData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const shipment = await shipmentCreateService(shipmentData)
                    req.flash('info', `Shipment "${shipment.name}" with code "${shipment.code}" is Added`)
                    res.redirect('/shipment/list')
                } catch (error) {
                    res.render('pages/shipment/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/shipment/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updateShipmentForm (req, res, next) {
        shipmentByIdService(req.params.id)
            .then(shipment => {
                if (shipment) {
                    res.render('pages/shipment/update', { shipment:shipment })
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
    putUpdateShipment: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('code')
            .isLength({ min: 1 }).trim().withMessage('Code field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('code').escape(),
        (req, res, next) => {
            const shipmentData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                shipmentUpdateService(shipmentData)
                    .then(shipment => {
                        req.flash('info', `Shipment "#${shipment.id} ${shipment.code} ${shipment.name}  ${shipment.weight}" is Updated`)
                        res.redirect('/shipment/list')
                    })
                    .catch(error => {
                        res.render('pages/shipment/update', {
                            shipment: {},
                            newShipment: shipmentData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/shipment/update', {
                    shipment: {},
                    newShipment: shipmentData,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteShipmentFrom (req, res, next) {
        shipmentByIdService(req.params.id)
            .then(shipment => {
                if (shipment) {
                    res.render('pages/shipment/delete', { shipment: shipment })
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
    deleteShipment (req, res, next) {
        shipmentDeleteService(req.body)
            .then(shipment => {
                req.flash('info', `Shipment "#${shipment.id} ${shipment.code} ${shipment.name} ${shipment.mass}" is Deleted`)
                res.redirect('/shipment/list')
            })
            .catch(error => {
                res.render('pages/shipment/delete', {
                    shipment: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
