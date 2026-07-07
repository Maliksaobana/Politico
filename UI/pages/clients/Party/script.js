import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu,convertToInput, convertToH_One, editTextarea } from "../../political/script.js";

const createPartyBtn = document.querySelector('.create_party'),
    partyHeaderText = document.querySelector('.page_info h2'),
    listAllParty = document.querySelector('.list_of_party'),
    hasAParty = document.querySelector('.profile_wrapper'),
    createPartyMenu = document.querySelector('.create_new_party'),
    createPartyImg = document.querySelector('.create_new_party_img span'),
    joinPArty = document.querySelector('.join'),
    createNewParty = document.querySelector(".createParty"),
    leaveParty = document.querySelector('.leave_party_btn'),
    PartyColor = document.querySelector('.for_color'),
    shortName = document.querySelector('.shortName')

const editButtons = document.querySelectorAll('.admin_edit_icon')
const shortNameEditButtons = document.querySelector('.shortName_admin_edit_icon')
const partyColorEditButtons = document.querySelector('.color')

const textAreaBtn = document.querySelector(".area_icon")

const change_color = (e) => {

    let Color = e.target.parentElement.previousElementSibling.firstElementChild.textContent;

    createPartyImg.style.color = '#fff'

    if(e.target.parentElement.previousElementSibling.firstElementChild.textContent.startsWith('#')) {
        Color = e.target.parentElement.previousElementSibling.firstElementChild.textContent.slice(0,7)
    }

    if(e.target.parentElement.previousElementSibling.firstElementChild.textContent === 'white' || e.target.parentElement.previousElementSibling.firstElementChild.textContent === '#fff' || e.target.parentElement.previousElementSibling.firstElementChild.textContent === '#ffffff') {
        createPartyImg.style.color = '#000'
    }else {
        createPartyImg.style.color = '#fff'
    }

    

    createPartyImg.style.backgroundColor = Color

    
}

const change_partyShortName = (e) => {

    createPartyImg.textContent = e.target.parentElement.previousElementSibling.firstElementChild.textContent
}



// eventlistners

openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)

createPartyBtn.addEventListener("click", () => {

    if(createPartyBtn.textContent === 'join party') {
        createPartyBtn.textContent = 'Create party'
        listAllParty.classList.add('active')
        partyHeaderText.textContent = 'List of Political Parties'
        createPartyMenu.classList.remove('active')
    }else {
        createPartyBtn.textContent = 'join party'
        listAllParty.classList.remove('active')
        partyHeaderText.textContent = 'Create Political Party'
        createPartyMenu.classList.add('active')
    }

})

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

shortNameEditButtons.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
            let value = e.target.parentElement.previousElementSibling.firstElementChild.textContent

            e.target.parentElement.previousElementSibling.firstElementChild.remove()

            const inputField = document.createElement("input")

            inputField.setAttribute('class','edit_field')
            inputField.setAttribute('maxlength','3')

            inputField.value = value

            e.target.parentElement.previousElementSibling.appendChild(inputField)


            e.target.setAttribute('class', 'fa-solid fa-check')
        }else {
            convertToH_One(e)
            change_partyShortName(e)
        }

})

partyColorEditButtons.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
            let value = e.target.parentElement.previousElementSibling.firstElementChild.textContent

            e.target.parentElement.previousElementSibling.firstElementChild.remove()

            const inputField = document.createElement("input")
            
            inputField.setAttribute('class','edit_field')

            inputField.value = value

            e.target.parentElement.previousElementSibling.appendChild(inputField)


            e.target.setAttribute('class', 'fa-solid fa-check')
        }else {
            convertToH_One(e)
            change_color(e)
        }

})


textAreaBtn.addEventListener('click', (e) => editTextarea(e))