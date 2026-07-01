import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu, dashboardMenu, adminUser } from "../script.js";


openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)



const editButtons = document.querySelectorAll('.admin_edit_icon')

const textAreaBtn = document.querySelector(".area_icon")
const profileEditBtn = document.querySelector(".edit_icon")

export const convertToInput = (e) => {
    let value = e.target.parentElement.previousElementSibling.firstElementChild.textContent

        e.target.parentElement.previousElementSibling.firstElementChild.remove()

        const inputField = document.createElement("input")

        inputField.setAttribute('class','edit_field')

        inputField.value = value

        e.target.parentElement.previousElementSibling.appendChild(inputField)


        e.target.setAttribute('class', 'fa-solid fa-check')
}

export const convertToH_One = (e) => {
    let edited_value = e.target.parentElement.previousElementSibling.firstElementChild.value

        e.target.parentElement.previousElementSibling.firstElementChild.remove()

        const textField = document.createElement("h1")

        textField.textContent = edited_value

        e.target.parentElement.previousElementSibling.appendChild(textField)

        e.target.setAttribute('class', 'fa-solid fa-pencil')
}

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

export const editTextarea = (e) =>{
    e.preventDefault()

    if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
            let value = e.target.parentElement.previousElementSibling.firstElementChild.textContent

            e.target.parentElement.previousElementSibling.firstElementChild.remove()

            const inputField = document.createElement("textarea")

            inputField.setAttribute('class','textarea_field')

            inputField.value = value

            e.target.parentElement.previousElementSibling.appendChild(inputField)


            e.target.setAttribute('class', 'fa-solid fa-check')
        }else {
            let edited_value = e.target.parentElement.previousElementSibling.firstElementChild.value

            e.target.parentElement.previousElementSibling.firstElementChild.remove()

            const textField = document.createElement("h1")


            textField.textContent = edited_value

            e.target.parentElement.previousElementSibling.appendChild(textField)


            e.target.setAttribute('class', 'fa-solid fa-pencil')
        }
}

textAreaBtn.addEventListener('click', (e) => editTextarea(e))
profileEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
        convertToInput(e)
    }else {
        convertToH_One(e)
    }
})