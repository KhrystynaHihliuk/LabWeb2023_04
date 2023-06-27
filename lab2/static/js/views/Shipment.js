const ShipmentModel = new Shipment()
function initAddForm () {
    const form = window.document.querySelector('#Shipment-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const ShipmentDataData = {}
        formData.forEach((value, key) => {
            ShipmentDataData[key] = value
        })


        ShipmentModel.Create(ShipmentDataData)
    })
}
function initList () {
    window.jQuery('#Shipment-list').DataTable({
        data: ShipmentModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Code', data: 'code' },
            { title: 'Name', data: 'name' },
            { title: 'Weight', data: 'weight' },
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

    ShipmentModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    const update_code_input = window.document.querySelector('#update_code')
    update_code_input.value = formData.code

    const update_name_input = document.querySelector('#update_name')
    update_name_input.value = formData.name

    const update_weight_input = window.document.querySelector('#update_weight')
    update_weight_input.value = formData.weight

    form.addEventListener('submit', function (e){
        const newData = {
            id: formData.id,
            code: update_code_input.value,
            name: update_name_input.value,
            weight:update_weight_input.value,
        }

        ShipmentModel.Update(formData, newData)
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
    document.addEventListener('ShipmentListDataChanged', function (e) {
        const dataTable = window.jQuery('#Shipment-list').DataTable()

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
