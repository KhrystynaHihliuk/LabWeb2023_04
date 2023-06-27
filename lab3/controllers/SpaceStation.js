'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const SpaceStationListService = require('../services/SpaceStation.all')
const SpaceStationCreateService = require('../services/SpaceStation.create')
const SpaceStationByIdService = require("../services/SpaceStation.byId");
const SpaceStationDeleteService = require("../services/SpaceStation.delete");
const SpaceStationUpdateService = require("../services/SpaceStation.update");

module.exports = {
    index (req, res) {
        res.render('pages/SpaceStation/index')
    },
    async SpaceStationList (req, res) {
        try {
            const SpaceStationList = await SpaceStationListService()
            res.render('pages/SpaceStation/list', {
                SpaceStations: SpaceStationList
            })
        } catch (error) {
            res.render('pages/SpaceStation/list', {
                SpaceStations: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createSpaceStationForm (req, res) {
        res.render('pages/SpaceStation/add')
    },
    postCreateSpaceStation: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('capacity')
            .isLength({ min: 1 }).trim().withMessage('Capacity must be specified.'),
        body('need')
            .isLength({ min: 1 }).trim().withMessage('Need must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('capacity').escape(),
        sanitizeBody('need').escape(),
        async (req, res) => {
            const SpaceStationData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const SpaceStation = await SpaceStationCreateService(SpaceStationData)
                    req.flash('info', `SpaceStation "${SpaceStation.name}" № "${SpaceStation.capacity}" is Added`)
                    res.redirect('/SpaceStation/list')
                } catch (error) {
                    res.render('pages/SpaceStation/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/SpaceStation/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updateSpaceStationForm (req, res, next) {
        SpaceStationByIdService(req.params.id)
            .then(SpaceStation => {
                if (SpaceStation) {
                    res.render('pages/SpaceStation/update', { SpaceStation: SpaceStation })
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
    putUpdateSpaceStation: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('capacity')
            .isLength({ min: 1 }).trim().withMessage('Capacity field must be specified.'),
        body('need')
            .isLength({ min: 1 }).trim().withMessage('Need field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('capacity').escape(),
        sanitizeBody('need').escape(),
        (req, res, next) => {
            const SpaceStationData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                SpaceStationUpdateService(SpaceStationData)
                    .then(SpaceStation => {
                        req.flash('info', `SpaceStation "${SpaceStation.name}" with capacity: "${SpaceStation.capacity}" and need: "${SpaceStation.need}" is Updated`)
                        res.redirect('/SpaceStation/list')
                    })
                    .catch(error => {
                        res.render('pages/SpaceStation/update', {
                            SpaceStation: {},
                            newSpaceStation: SpaceStationData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/SpaceStation/update', {
                    SpaceStation: {},
                    newSpaceStation: SpaceStationData,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteSpaceStationFrom (req, res, next) {
        SpaceStationByIdService(req.params.id)
            .then(SpaceStation => {
                if (SpaceStation) {
                    res.render('pages/SpaceStation/delete', { SpaceStation: SpaceStation })
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
    deleteSpaceStation (req, res, next) {
        SpaceStationDeleteService(req.body)
            .then(SpaceStation => {
                req.flash('info', `SpaceStation "${SpaceStation.name}" with capacity: "${SpaceStation.capacity}" and need: "${SpaceStation.need}" is Deleted`)
                res.redirect('/SpaceStation/list')
            })
            .catch(error => {
                res.render('pages/SpaceStation/delete', {
                    SpaceStation: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
