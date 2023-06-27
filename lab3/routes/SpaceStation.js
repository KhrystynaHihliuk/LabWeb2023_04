'use strict'

const express = require('express')
const router = express.Router()

const SpaceStationController = require('../controllers/SpaceStation')

router.get('/', SpaceStationController.index)
router.get('/list', SpaceStationController.SpaceStationList)
router.get('/add', SpaceStationController.createSpaceStationForm)
router.post('/add', SpaceStationController.postCreateSpaceStation)
router.get('/edit/:id', SpaceStationController.updateSpaceStationForm)
router.post('/edit/:id', SpaceStationController.putUpdateSpaceStation)
router.get('/remove/:id', SpaceStationController.deleteSpaceStationFrom)
router.post('/remove/:id', SpaceStationController.deleteSpaceStation)


module.exports = router
