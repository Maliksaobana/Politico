import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu, dashboardMenu, adminUser, convertToInput, convertToH_One, editTextarea } from "../baseExports.js";


openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)



const editButtons = document.querySelectorAll('.admin_edit_icon')

const profileEditBtn = document.querySelector(".edit_icon")

editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
            convertToInput(e)
        }else {
            convertToH_One(e)
        }

    })
})

profileEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
        convertToInput(e)
    }else {
        convertToH_One(e)
    }
})