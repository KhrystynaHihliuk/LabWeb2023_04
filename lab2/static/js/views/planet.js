const planetModel = new Planet()
function initAddForm () {
    const form = window.document.querySelector('#planet-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const planetData = {}
        formData.forEach((value, key) => {
            planetData[key] = value
        })

        planetModel.Create(planetData)
    })
}
function initList () {
    window.jQuery('#planet-list').DataTable({
        data: planetModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'StoreCapacity', data: 'StoreCapacity' },
            { title: 'Mass', data: 'mass' },
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

    planetModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    const update_name_input = document.querySelector('#update_name')
    update_name_input.value = formData.name

    const update_storeCapacity_input = window.document.querySelector('#update_storeCapacity')
    update_storeCapacity_input.value = formData.StoreCapacity

    const update_mass_input = window.document.querySelector('#update_mass')
    update_mass_input.value = formData.mass

    form.addEventListener('submit', function (e){

        const newData = {
            id: formData.id,
            name: update_name_input.value,
            StoreCapacity: update_storeCapacity_input.value,
            mass: update_mass_input.value,
        }

        planetModel.Update(formData, newData)
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
    document.addEventListener('planetListDataChanged', function (e) {
        const dataTable = window.jQuery('#planet-list').DataTable()

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
