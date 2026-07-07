export const closeMenuBtn = document.querySelector('.menu_close'),
    openMenuBtn = document.querySelector('.menu'),
    openMenuBtnIcon = document.querySelector('.menu i'),
    adminUser = document.querySelector('.only_admin'),
    dashboardMenu = document.querySelector('.dashboard_menu');


export const closeMenu = () => {
    setTimeout(()=>{
        dashboardMenu.classList.toggle('open')
        openMenuBtn.classList.toggle('closeTab')
        openMenuBtnIcon.classList.toggle('close')
    },200)
    closeMenuBtn.classList.toggle('close')
}

export const openMenu = () => {
    dashboardMenu.classList.toggle('open')
    openMenuBtnIcon.classList.toggle('close')
    setTimeout(()=>{
        openMenuBtn.classList.toggle('closeTab')
    },100)
    closeMenuBtn.classList.remove('close')
}

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

closeMenuBtn.addEventListener('click', closeMenu)

openMenuBtn.addEventListener('click', openMenu)