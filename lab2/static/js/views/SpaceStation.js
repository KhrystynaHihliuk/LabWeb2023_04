const SpaceStationModel = new SpaceStation()
function initAddForm () {
    const form = window.document.querySelector('#SpaceStation-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const SpaceStationDataData = {}
        formData.forEach((value, key) => {
            SpaceStationDataData[key] = value
        })


        SpaceStationModel.Create(SpaceStationDataData)
    })
}
function initList () {
    window.jQuery('#SpaceStation-list').DataTable({
        data: SpaceStationModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Capacity', data: 'capacity' },
            { title: 'Need', data: 'need' },
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

    SpaceStationModel.Delete(formData)
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

    const update_capacity_input = window.document.querySelector('#update_capacity')
    update_capacity_input.value = formData.capacity

    const update_need_input = window.document.querySelector('#update_need')
    update_need_input.value = formData.need

    form.addEventListener('submit', function (e){
        const newData = {
            id: formData.id,
            name: update_name_input.value,
            capacity: update_capacity_input.value,
            need:update_need_input.value,
        }

        SpaceStationModel.Update(formData, newData)
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
    document.addEventListener('SpaceStationListDataChanged', function (e) {
        const dataTable = window.jQuery('#SpaceStation-list').DataTable()

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
