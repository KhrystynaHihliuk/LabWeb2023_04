const DeliveredShipmentsModel = new DeliveredShipment();
const SpaceStationsModel = new SpaceStation();
const PlanetModel = new Planet();
const ShipmentModel=new Shipment();

function initAddForm () {

  const shipment_input = document.querySelector('#shipment')
  ShipmentModel.Select().forEach(element => {
    shipment_input.innerHTML += `<option value="${element.name}">${element.name} </option>`
  })

  const planet_input = document.querySelector('#planetName')
  PlanetModel.Select().forEach(element => {
    planet_input.innerHTML += `<option value="${element.name}">${element.name} </option>`
  })

  const SpaceStations_input = document.querySelector('#spaceStationsName')
  SpaceStationsModel.Select().forEach(element => {
    SpaceStations_input.innerHTML += `<option value="${element.name}">${element.name}</option>`
  })

  const form = window.document.querySelector('#DeliveredShipment-add-form')
  form.addEventListener('submit', function (e) {
    const formData = new FormData(e.target)
    const DeliveredShipmentDataData = {}
    formData.forEach((value, key) => {
      DeliveredShipmentDataData[key] = value
    })

    DeliveredShipmentsModel.Create(DeliveredShipmentDataData)
  })
}
function initList () {

  window.jQuery('#DeliveredShipment-list').DataTable({
    data: DeliveredShipmentsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Shipment', data: 'shipment' },
      { title: 'SpaceStationName', data: 'spaceStationsName' },
      { title: 'PlanetName', data: 'planetName' },
      {
        data: null,
        title: 'Action',
        wrap: true,
        render: function (item) {
          const def = JSON.stringify(item)
          return `<div>
                        <div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-item='${def}'>Delete</button></div>
                        <div class="btn-group"> <button type="button"  id="btn_update" class="btn_update btn-primary " data-item='${def}'>Update</button></div>
                    </div>`
        },
      },
    ]
  })
}
function initEventToDeleteButtons() {
  const elems = document.querySelectorAll('#btn_delete')

  elems.forEach((item) => {
    item.addEventListener('click', function () {
      initDeleteElement(item.dataset.item)
    })
  })
}
function initDeleteElement(row) {
  const formData = JSON.parse(row)

  DeliveredShipmentsModel.Delete(formData)
}
function initUpdateElementForm(row) {
  const formData = JSON.parse(row)

  const form = document.querySelector('#update-form')
  form.style.display = 'block'

  const cancel_update_button = document.querySelector('#btn-cancel')
  cancel_update_button.addEventListener('click',function (){
    form.style.display = 'none'
  })


  form.addEventListener('submit', function (e){
    const newData = {
      id: formData.id,
      shipment:formData.shipment,
      planetId: formData.planetName,
      SpaceStationId: formData.SpaceStationName,
    }

    DeliveredShipmentsModel.Update(formData, newData)
  })
}
function initEventToUpdateButtons() {
  const elems = document.querySelectorAll('#btn_update')

  elems.forEach((item) => {
    item.addEventListener('click', function () {
      initUpdateElementForm(item.dataset.item)
    })
  })
}
function initListEvents () {
  document.addEventListener('DeliveredShipmentListDataChanged', function (e) {
    const dataTable = window.jQuery('#DeliveredShipment-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
  initEventToDeleteButtons()
  initEventToUpdateButtons()
})
