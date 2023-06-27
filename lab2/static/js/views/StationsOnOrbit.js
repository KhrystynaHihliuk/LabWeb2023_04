const StationsOnOrbit_ticketModel = new StationsOnOrbit();
const SpaceStationsModel = new SpaceStation();
const PlanetModel = new Planet();


function initAddForm () {

    const planet_input = document.querySelector('#planetName')
    PlanetModel.Select().forEach(element => {
        planet_input.innerHTML += `<option value="${element.name}">${element.name} </option>`
    })

    const SpaceStations_input = document.querySelector('#spaceStationsName')
    SpaceStationsModel.Select().forEach(element => {
        SpaceStations_input.innerHTML += `<option value="${element.name}">${element.name}</option>`
    })

    const form = window.document.querySelector('#StationsOnOrbit-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const StationsOnOrbitDataData = {}
        formData.forEach((value, key) => {
            StationsOnOrbitDataData[key] = value
        })

        StationsOnOrbit_ticketModel.Create(StationsOnOrbitDataData)
    })
}
function initList () {

    window.jQuery('#StationsOnOrbit-list').DataTable({
        data: StationsOnOrbit_ticketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
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

    StationsOnOrbit_ticketModel.Delete(formData)
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
            planetId: formData.planetName,
            SpaceStationId: formData.SpaceStationName,
        }

        StationsOnOrbit_ticketModel.Update(formData, newData)
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
    document.addEventListener('StationsOnOrbitListDataChanged', function (e) {
        const dataTable = window.jQuery('#StationsOnOrbit-list').DataTable()

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
