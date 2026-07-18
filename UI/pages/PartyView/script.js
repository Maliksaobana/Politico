import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu,convertToInput, convertToH_One, editTextarea,profileImg,userName,isLoading,partyName,position,logOutFunc} from "../baseExports.js"

import { base_url, url_endpoints } from "../../base.js"


const {getUser:GETUSER} = url_endpoints.user,
    {createParty: CREATEPARTY} = url_endpoints.party,
    {getAllParty: GETALLPARTY} = url_endpoints.party,
    {joinParty: JOINPARTY} = url_endpoints.party, //add id
    {editParty:EDITPARTY} = url_endpoints.party, // add id
    {deleteParty: DELETEPARTY} = url_endpoints.party, // add id
    {getSpecificParty: GETSPECIFICPARTY} = url_endpoints.party // add id

const token = JSON.parse(localStorage.getItem("token"))


// general section

const createPartyBtn = document.querySelector('.create_party'),
    partyHeaderText = document.querySelector('.page_info h2'),

    // list of political party section

    listAllParty = document.querySelector('.list_of_party'),


    //  profile section

    hasAParty = document.querySelector('.profile_wrapper'),
    leaveParty = document.querySelector('.leave_party_btn'),
    userPartyName = document.querySelector('.NOP'),
    userPartySlogan = document.querySelector('.PS'),
    userPartyMotto = document.querySelector('.PM'),
    userPartyHeadquaters = document.querySelector('.HQ'),
    userPartyProfileImg = document.querySelector('.profile_img span'),

    
    
    createPartyImg = document.querySelector('.create_new_party_img span'),


    // create political party call sectioin


    createPartyMenu = document.querySelector('.create_new_party'),
    createNewParty = document.querySelector(".createParty"),
    postNewPartyName = document.querySelector(".enter_party_name"),
    postNewPartyShortName = document.querySelector(".forShortName"),
    postNewPartyColor = document.querySelector(".party_colors"),
    postNewPartySlogan = document.querySelector(".party_slogan"),
    postNewPartyMotto = document.querySelector(".textarea_field"),
    postNewPartyHqAddress = document.querySelector(".party_hq"),


    // edit political party call section

    editPoliticalParty = document.querySelector('.edit_party'),
    editPoliticalSaveBtn = document.querySelector('.edit_clicked_party'),
    editPartyHqAddress = document.querySelector(".EHQ"),
    editPartyImgParent = document.querySelector(".edit_img"),
    editPartyImg = document.querySelector(".edit_img span"),
    editPartyColor = document.querySelector(".EC"),
    editPartyMotto = document.querySelector(".EM"),
    editPartyShortName = document.querySelector(".EDSN"),
    editPartySlogan = document.querySelector(".ES"),
    editPartyName = document.querySelector(".EDN"),


    // bonus

    editOrJoinBtn = document.querySelector('.join'),
    pageLoader = document.querySelector('.pageLoader'),
    createBtnLoader = document.querySelector('.loader'),
    editBtnLoader = document.querySelector('.editLoader'),
    pageLoaderSub = document.querySelector('.pageLoaderSub'),
    errorDivHandler = document.querySelector(".errModal"),
    popIcon = errorDivHandler.querySelector('.fa-regular'),
    errorTextContent = document.querySelector(".errModal h1 span")



const editButtons = document.querySelectorAll('.admin_edit_icon')
const shortNameEditButtons = document.querySelector('.shortName_admin_edit_icon')
const partyColorEditButtons = document.querySelector('.color'),
    PartyColor = document.querySelector('.for_color'),
    shortName = document.querySelector('.shortName')

const textAreaBtn = document.querySelector(".area_icon")


// api methods

const method = {
    method: "GET",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

const deleteParty = {
    method: "DELETE",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
}
const joinParty = {
    method: "PATCH",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
}


const getUserDashBoardData = async () => {
    isLoading(true,pageLoader)
    errorDivHandler.classList.remove("show")
    try {

        const response = await fetch(`${base_url}${GETUSER}`,method)
        const listOfPartyResponse = await fetch(`${base_url}${GETALLPARTY}`,method)

        if(!response.ok || !listOfPartyResponse.ok ) {
            isLoading(false,pageLoader)
            throw new Error(" Cant get Information")
        }

        isLoading(false,pageLoader)

        partyHeaderText.textContent = "List of Political Parties"

        const data = await listOfPartyResponse.json()
        const datatwo = await response.json()

        const trimmedName = datatwo.body.name.split(" ").splice(0,2).join(" ")
        const profileName = datatwo.body.name.split(" ").splice(0,2).map(item => {
                return item.slice(0,1).toUpperCase()
            }).join("")

        listAllParty.classList.add("active")

        if(datatwo.body.hasAParty === false) {
            partyName.style.display = "none"
            document.querySelector(".create_party_btn").classList.remove("hasParty")
        }else {
            partyHeaderText.style.display = "none"
            userName.textContent = trimmedName
            position.textContent = datatwo.body.role
            partyName.textContent = datatwo.body.party.partyShortName ?? null
            hasAParty.classList.add("active")
            listAllParty.classList.remove('active')
            userPartyName.textContent = datatwo.body.party.partyName
            userPartySlogan.textContent = datatwo.body.party.partySlogan 
            userPartyMotto.textContent = datatwo.body.party.partyMotto
            userPartyHeadquaters.textContent = datatwo.body.party.hqAddress
            userPartyProfileImg.textContent = datatwo.body.party.partyShortName
            userPartyProfileImg.style.backgroundColor = datatwo.body.party.partyColor
        }

        if(datatwo.body.role === "admin") {
            createPartyBtn.classList.add("active")
        }

        

        userName.textContent = trimmedName
        position.textContent = datatwo.body.role

        if(datatwo.body.hasAParty === false) {
            partyName.style.display = "none"
        }else {
            partyName.textContent = datatwo.body.party.partyShortName
        }
         
        profileImg.textContent = profileName

        listAllParty.innerHTML = `
            <div class="party_items">
                    <div class="party_lists">
                        
                    </div>
            </div>`

        
        if(data.body.length === 0) {
            const errorMessage = document.createElement("div")
            const errorMessageText = document.createElement("h1")
            errorMessageText.textContent = `no party available ${datatwo.body.role === "admin" ? "add one": ""}`
            errorMessage.setAttribute("class","noList")
            errorMessage.append(errorMessageText)
            document.querySelector(".party_lists").append(errorMessage)
            return
        }

         data.body.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt) 
        }).forEach(item => {
            const cardHolder = document.createElement("div")
            cardHolder.setAttribute("class","party_card")
            cardHolder.innerHTML = `
                <div class="party_card_info">
                    <div class="party_abt">
                        <div class="party_card_img">
                            <span style=background-color:${item.partyColor}>${item.partyShortName}</span>
                        </div>
                        <div class="party_name">
                            <div class="party_name_info">
                                <h3>${item.partyName}</h3>
                                <h4>${item.hqAddress}</h4>
                                <p><span>Slogan</span> • ${item.partySlogan}</p>
                            </div>
                        </div>
                    </div>
                    <div class="party_motto">
                        <h2>${item.partyMotto}</h2>
                    </div>
                </div>
                <div class="call_to_action">
                    <button class="isAdmin join" id=${item._id}>${datatwo.body.role === "admin" ? "edit" : "join"}</button>
                    ${datatwo.body.role === "admin" ? `<button class='del' id=${item._id}>delete</button>` : ""}
                </div>`

            document.querySelector(".party_lists").append(cardHolder)
        })

        document.querySelectorAll(".join").forEach(item => item.addEventListener("click", (e) => {
            if(e.target.textContent === "edit") {
                document.querySelector(".create_party_btn").classList.remove("hasParty")
                partyHeaderText.textContent = "Edit Political party"
                createPartyBtn.textContent = "Go back"
                editPartyFunc(e.target.getAttribute("id"))
            }else {
                joinPartyFunc(e.target.getAttribute("id"))
            }
        }))

        document.querySelectorAll(".del").forEach(item => item.addEventListener("click",(e) => {
            e.preventDefault()
            deletePartyFunc(e.target.getAttribute("id"))
        }))

    } catch (e) {
        isLoading(false,pageLoader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)


        console.error(e.message)
    }
}


//  join political party
const joinPartyFunc = async (id) => {
    try {
        const response = await fetch(`${base_url}${JOINPARTY}${id}`,joinParty)

        if(!response.ok) {
            throw new Error("cant join party")
        }

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = ' Joined successful'

        setTimeout(()=> {
            getUserDashBoardData()
        },1500)

    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message
        console.error(e.message)
    }
}


// create political party
//admin only
const createPoliticalParty = async () => {
    isLoading(true,createBtnLoader)
    errorDivHandler.classList.remove("show")
    try {
        const response = await fetch(`${base_url}${CREATEPARTY}`,{
        method: "POST",
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            partyName: postNewPartyName.value,
            hqAddress: postNewPartyHqAddress.value,
            partyColor: postNewPartyColor.value,
            partyShortName: postNewPartyShortName.value,
            partySlogan: postNewPartySlogan.value,
            partyMotto: postNewPartyMotto.value
        })
    })

        if(!response.ok) {
            isLoading(false,createBtnLoader)
            createPartyMenu.classList.remove("active")
            listAllParty.classList.add("active")
            createPartyBtn.textContent = 'Create party'
            partyHeaderText.textContent = 'List of Partie(s)'


            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = ' Error creating Party'

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)
            throw new Error("error creating new office")
        }

        isLoading(false,createBtnLoader)

        createPartyMenu.classList.remove("active")
        listAllParty.classList.add("active")
        createPartyBtn.textContent = 'Create party'
        partyHeaderText.textContent = 'List of Political Parties'


        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = ' successful'


        setTimeout(()=> {
            getUserDashBoardData()
        },3000)

        postNewPartyName.value = '',
        postNewPartyHqAddress.value = '',
        postNewPartyColor.value = '',
        postNewPartyShortName.value = '',
        postNewPartySlogan.value = '',
        postNewPartyMotto.value = ''

    } catch (e) {
        isLoading(false,createBtnLoader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        console.error(e.message)
    }
}

// delete political party
// admin only
const deletePartyFunc = async (id) => {
    try {
        const response = await fetch(`${base_url}${DELETEPARTY}${id}`,deleteParty)

        if(!response.ok) {
            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = " Failed to delete"

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)

            throw new Error("failed  to delete party")
        }


        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = " Deleted successful"

        setTimeout(()=> {
            getUserDashBoardData()
        },1500)



    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        console.error(e.message)
    }
}

// edit political party
// admin only
// getInfo
const editPartyFunc = async (id) => {
    
    try {
        
        const response = await fetch(`${base_url}${GETSPECIFICPARTY}${id}`,method)

        if(!response.ok) {
            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = ' Error loading Party info'

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)
            throw new Error("error getting office")
        }

        listAllParty.classList.remove("active")

        editPoliticalParty.classList.add("active")

        const data = await response.json()

        editPartyImg.style.backgroundColor = data.body.partyColor

        editPoliticalSaveBtn.setAttribute("id",id)

        change_color(editPartyImg)


        editPartyHqAddress.value = data.body.hqAddress
        editPartyImg.textContent = data.body.partyShortName
        editPartyColor.value = data.body.partyColor
        editPartyMotto.value = data.body.partyMotto
        editPartyShortName.value = data.body.partyShortName
        editPartySlogan.value = data.body.partySlogan
        editPartyName.value = data.body.partyName

    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        console.error(e.message)
    }
}

const submitEditedPartyFunction = async (id) => {
    isLoading(true,editBtnLoader)
    try {
        const response = await fetch(`${base_url}${EDITPARTY}${id}`,{
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                partyName: editPartyName.value,
                hqAddress: editPartyHqAddress.value,
                partyColor: editPartyColor.value,
                partyShortName: editPartyShortName.value,
                partySlogan: editPartySlogan.value,
                partyMotto: editPartyMotto.value
            })
        })

        if(!response.ok) {
            isLoading(false,editBtnLoader)
            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = ' Failed'

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)
            throw new Error("error updating party")
        }

        isLoading(false,editBtnLoader)

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = ' Created successful'

        editPoliticalParty.classList.remove("active")        

        while(listAllParty.firstChild) {
            listAllParty.removeChild(listAllParty.firstChild)
        }

        partyHeaderText.textContent = "List of Political parties"

        // await isLoading(true,pageLoader)

        setTimeout(()=> {
            listAllParty.classList.add("active")
            getUserDashBoardData()
        },1500)
        isLoading(false,pageLoader)

        editPartyName.value = '',
        editPartyHqAddress.value = '',
        editPartyColor.value = '',
        editPartyShortName.value = '',
        editPartySlogan.value = '',
        editPartyMotto.value = ''

    } catch (e) {
        isLoading(false,editBtnLoader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        console.error(e.message)
    }
}

window.addEventListener("load",()=>{
    //
    getUserDashBoardData()
})

const change_color = (cElement) => {

    let bgColor = cElement.style.backgroundColor;

    cElement.style.color = '#fff'

    if(bgColor.startsWith('#')) {
        cElement.style.color = '#fff'
    }

    if(bgColor === 'white' || bgColor === '#fff' || bgColor === '#ffffff' || bgColor.startsWith('#') || bgColor === "rgb(255,255,255)") {
        createPartyImg.style.color = '#000'
    }else {
        createPartyImg.style.color = '#fff'
    }
    
}


// editPoliticalParty.classList.remove('active')

// eventlistners

openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)

createPartyBtn.addEventListener("click", () => {

    if(createPartyBtn.textContent === 'list parties') {
        createPartyBtn.textContent = 'Create party'
        listAllParty.classList.add('active')
        partyHeaderText.textContent = 'List of Political Parties'
        createPartyMenu.classList.remove('active')
        postNewPartyName.value = ''
        postNewPartyHqAddress.value = ''
        postNewPartyColor.value = ''
        postNewPartyShortName.value = ''
        postNewPartySlogan.value = ''
        postNewPartyMotto.value = ''
        
    }else if(createPartyBtn.textContent === 'Go back'){
        createPartyBtn.textContent = 'Create party'
        listAllParty.classList.add('active')
        partyHeaderText.textContent = 'List of Political Parties'
        createPartyMenu.classList.remove('active')
        editPoliticalParty.classList.remove('active')
    }else {
        createPartyBtn.textContent = 'list parties'
        listAllParty.classList.remove('active')
        partyHeaderText.textContent = 'Create Political Party'
        createPartyMenu.classList.add('active')
    }

})



editPoliticalSaveBtn.addEventListener("click", (e) => {
    e.preventDefault()

    submitEditedPartyFunction(e.target.getAttribute("id"))
})

createNewParty.addEventListener("click", (e) => {
    e.preventDefault()

    if(postNewPartyColor.value === 'white' || postNewPartyColor.value === '#fff' || postNewPartyColor.value === '#ffffff' || postNewPartyColor.value === "rgb(255,255,255)") {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = " Party color can't be white"

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        return
    }

    createPoliticalParty()
})

document.querySelector(".log_out").addEventListener("click", logOutFunc)
