const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/DeliveredShipment', function (request, response) {
  response.render('pages/DeliveredShipment', { title: 'DeliveredShipment' })
})
app.get('/planet', function (request, response) {
  response.render('pages/planet', { title: 'Planet' })
})
app.get('/SpaceStation', function (request, response) {
  response.render('pages/SpaceStation', { title: 'SpaceStation' })
})
app.get('/Shipment', function (request, response) {
  response.render('pages/Shipment', { title: 'Shipment' })
})
app.get('/StationsOnOrbit', function (request, response) {
  response.render('pages/StationsOnOrbit', { title: 'StationsOnOrbit' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)
