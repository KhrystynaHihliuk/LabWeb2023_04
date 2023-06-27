'use strict'

const express = require('express')
const router = express.Router()

const shipmentController = require('../controllers/shipment')

router.get('/', shipmentController.index)
router.get('/list', shipmentController.shipmentList)
router.get('/add', shipmentController.createShipmentForm)
router.post('/add', shipmentController.postCreateShipment)
router.get('/edit/:id', shipmentController.updateShipmentForm)
router.post('/edit/:id', shipmentController.putUpdateShipment)
router.get('/remove/:id', shipmentController.deleteShipmentFrom)
router.post('/remove/:id', shipmentController.deleteShipment)

module.exports = router
