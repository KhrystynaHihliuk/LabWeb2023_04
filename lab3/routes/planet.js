'use strict'

const express = require('express')
const router = express.Router()

const planetController = require('../controllers/planet')

router.get('/', planetController.index)
router.get('/list', planetController.planetList)
router.get('/add', planetController.createPlanetForm)
router.post('/add', planetController.postCreatePlanet)
router.get('/edit/:id', planetController.updatePlanetForm)
router.post('/edit/:id', planetController.putUpdatePlanet)
router.get('/remove/:id', planetController.deletePlanetFrom)
router.post('/remove/:id', planetController.deletePlanet)

module.exports = router
