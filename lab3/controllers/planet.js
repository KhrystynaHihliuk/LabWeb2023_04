'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const planetListService = require('../services/planet.all')
const planetCreateService = require('../services/planet.create')
const planetByIdService = require("../services/planet.byId");
const planetDeleteService = require("../services/planet.delete");
const planetUpdateService = require("../services/planet.update");

module.exports = {
    index (req, res) {
        res.render('pages/planet/index')
    },
    async planetList (req, res) {
        try {
            const planetList = await planetListService()
            res.render('pages/planet/list', {
                planets: planetList
            })
        } catch (error) {
            res.render('pages/planet/list', {
                planets: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createPlanetForm (req, res) {
        res.render('pages/planet/add')
    },
    postCreatePlanet: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('StoreCapacity')
            .isLength({ min: 1 }).trim().withMessage('StoreCapacity field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('StoreCapacity').escape(),
        async (req, res) => {
            // const success = true
            const planetData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const planet = await planetCreateService(planetData)
                    req.flash('info', `Planet "${planet.name}" with StoreCapacity "${planet.StoreCapacity}" is Added`)
                    res.redirect('/planet/list')
                } catch (error) {
                    res.render('pages/planet/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/planet/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updatePlanetForm (req, res, next) {
        planetByIdService(req.params.id)
            .then(planet => {
                if (planet) {
                    res.render('pages/planet/update', { planet: planet })
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
    putUpdatePlanet: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('StoreCapacity')
            .isLength({ min: 1 }).trim().withMessage('StoreCapacity field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('StoreCapacity').escape(),
        (req, res, next) => {
            const planetData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                planetUpdateService(planetData)
                    .then(planet => {
                        req.flash('info', `Planet "#${planet.id} ${planet.name} ${planet.StoreCapacity} ${planet.mass}" is Updated`)
                        res.redirect('/planet/list')
                    })
                    .catch(error => {
                        res.render('pages/planet/update', {
                            planet: {},
                            newPlanet: planetData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/planet/update', {
                    planet: {},
                    newPlanet: planetData,
                    errors: errors.array()
                })
            }
        }
    ],
    deletePlanetFrom (req, res, next) {
        planetByIdService(req.params.id)
            .then(planet => {
                if (planet) {
                    res.render('pages/planet/delete', { planet: planet })
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
    deletePlanet (req, res, next) {
        planetDeleteService(req.body)
            .then(planet => {
                req.flash('info', `Planet "#${planet.id} ${planet.name} ${planet.StoreCapacity} ${planet.mass}" is Deleted`)
                res.redirect('/planet/list')
            })
            .catch(error => {
                res.render('pages/planet/delete', {
                    planet: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
