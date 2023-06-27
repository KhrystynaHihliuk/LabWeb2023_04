'use strict'

const express = require('express')
const router = express.Router()

const DeliveredShipmentController = require('../controllers/DeliveredShipment')

router.get('/', DeliveredShipmentController.index)
router.get('/list', DeliveredShipmentController.DeliveredShipmentList)
router.get('/add', DeliveredShipmentController.createDeliveredShipmentForm)
router.post('/add', DeliveredShipmentController.postCreateDeliveredShipment)
router.get('/edit/:id', DeliveredShipmentController.updateDeliveredShipmentForm)
router.post('/edit/:id', DeliveredShipmentController.putUpdateDeliveredShipment)
router.get('/remove/:id', DeliveredShipmentController.deleteDeliveredShipmentFrom)
router.post('/remove/:id', DeliveredShipmentController.deleteDeliveredShipment)

module.exports = router
