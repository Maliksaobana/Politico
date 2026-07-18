import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu,convertToInput, convertToH_One, editTextarea,profileImg,isLoading,userName,partyName,position, logOutFunc} from "../baseExports.js"

import { base_url, url_endpoints } from "../../base.js"


const {getUser:GETUSER} = url_endpoints.user,
    {createOffice: CREATEOFFICE} = url_endpoints.office,
    {getAllOffice: GETALLOFFICE} = url_endpoints.office,
    {editOffice:EDITOFFICE} = url_endpoints.office, // add id
    {deleteOffice: DELETEOFFICE} = url_endpoints.office, // add id
    {getSpecificOffice: GETSPECIFICOFFICE} = url_endpoints.office, // add id
    {runForOffice: CONTESTFOROFFICE} = url_endpoints.register, //add id
    {acceptCandidate: ACCEPTCANDIDATE} = url_endpoints.register, //add id
    {getAllRegistered: GETALLREGISTERED} = url_endpoints.register


const token = JSON.parse(localStorage.getItem("token"))







const createPartyBtn = document.querySelector('.create_party'),
    partyHeaderText = document.querySelector('.page_info h2'),
    listAllOfficeWrapper = document.querySelector('.list_of_party'),
    hasAParty = document.querySelector('.profile_wrapper'),
    createPartyMenu = document.querySelector('.create_new_party'),
    createPartyImg = document.querySelector('.create_new_party_img span'),
    btnToJoinOrDeleteParty = document.querySelector('.join'),




    postNewOfficeName = document.querySelector(".ON"),
    postNewOfficeLevel = document.querySelector(".OL"),
    postNewOfficeArm = document.querySelector(".OA"),
    postNewOfficeDescription = document.querySelector(".OD"),
    postNewOfficeRole = document.querySelector(".OR"),
    createNewOffice = document.querySelector(".createOffice"),



    contestOfficeBtn = document.querySelector(".contestOffice"),
    contestOfficeCampaignPromise = document.querySelector(".CP"),
    contestOfficeArm = document.querySelector(".CA"),
    contestOfficeName = document.querySelector(".CN"),
    contestOfficeLevel = document.querySelector(".CL"),
    contestOfficeRole = document.querySelector(".CR"),
    contestWrapper = document.querySelector(".run_for_office"),
    contestantLists = document.querySelector(".candidate"),
    goBackListBtn = document.querySelector(".goBack"),



    officeContestantsWrapper = document.querySelector(".list_of_contestant"),



    leaveParty = document.querySelector('.leave_party_btn'),
    PartyColor = document.querySelector('.for_color'),
    shortName = document.querySelector('.shortName'),
    selectCreatedArm = document.querySelector('.select_arm'),
    selectCreatedLevel = document.querySelector('.select_level'),
    createTextForCampaignPromise = document.querySelector('.forTextHold'),



    errorDivHandler = document.querySelector(".errModal"),
    errorTextContent = errorDivHandler.querySelector(".errModal h1 span"),
    loader = document.querySelector(".pageLoader"),
    createLoader = document.querySelector(".loader"),
    loaderSub = document.querySelector(".pageLoaderSub"),
    popIcon = document.querySelector(".fa-regular")

const editButtons = document.querySelectorAll('.admin_edit_icon')
const partyColorEditButtons = document.querySelector('.color')

const textAreaBtn = document.querySelector(".area_icon")

const createHeaderForCampaignPromise = document.createElement("h1")

const method = {
    method: "GET",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}



const deleteOfficeMethod = {
    method: "DELETE",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
}

// DONE

const runForOffice = {
    method: "GET",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}


const getUserDashBoardData = async () => {

    isLoading(true,loader)
    errorDivHandler.classList.remove("show")

    try {

        
        goBackListBtn.classList.remove("active")

        const response = await fetch(`${base_url}${GETUSER}`,method)
        const listOfAllOfficeResponse = await fetch(`${base_url}${GETALLOFFICE}`,method)

        if(!response.ok || !listOfAllOfficeResponse.ok ) {
            isLoading(false,loader)

            throw new Error("Failed to fetch")
        }

        isLoading(false,loader)

        const data = await listOfAllOfficeResponse.json()
        const datatwo = await response.json()

        const trimmedName = datatwo.body.name.split(" ").splice(0,2).join(" ")
        const profileName = datatwo.body.name.split(" ").splice(0,2).map(item => {
                return item.slice(0,1).toUpperCase()
            }).join("")

        if(datatwo.body.hasAParty === false) {
            partyName.style.display = "none"
            document.querySelector(".create_party_btn").classList.remove("hasParty")
        }else {
            partyName.textContent = datatwo.body.party.partyShortName
        }

        userName.textContent = trimmedName
        position.textContent = datatwo.body.role

        profileImg.textContent = profileName

        if(datatwo.body.role === "admin") {
            createPartyBtn.classList.add("active")
            contestantLists.classList.add("active")
        }

        // if user has submitted application

        if(datatwo.body.hasSubmittedApplication) {
            listAllOfficeWrapper.classList.remove("active")
            contestWrapper.classList.add("active")
            createTextForCampaignPromise.replaceChild(createHeaderForCampaignPromise,contestOfficeCampaignPromise)

            contestOfficeBtn.disabled = true

            if(!data.body.isApproved) {
                contestOfficeBtn.textContent = "Awaiting approval"
                contestOfficeBtn.classList.add("awaiting")
            }else {
                contestOfficeBtn.textContent = "Competing"
                contestOfficeBtn.classList.remove("awaiting")
            }

            contestOfficeArm.textContent = datatwo.body.office.officeArm
            contestOfficeName.textContent = datatwo.body.office.officeName
            contestOfficeLevel.textContent = datatwo.body.office.officeLevel
            contestOfficeRole.textContent = datatwo.body.office.officeRole
            createHeaderForCampaignPromise.textContent = datatwo.body.campaignPromise

            return
        }


        

        listAllOfficeWrapper.classList.add("active")

        partyHeaderText.textContent = "List of Office(s)"

        listAllOfficeWrapper.innerHTML = `
            <div class="party_items">
                    <div class="party_lists">
                        
                    </div>
            </div>`

        
        if(data.body.length === 0) {
            const errorMessage = document.createElement("div")
            const errorMessageText = document.createElement("h1")
            errorMessageText.textContent = `no office available ${datatwo.body.role === "admin" ? "add one": ""}`
            errorMessage.setAttribute("class","noList")
            errorMessage.append(errorMessageText)
            document.querySelector(".party_lists").append(errorMessage)
            return
        }


        data.body.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt) 
        }).forEach(item => {
                const candidateHolder = document.createElement("div")
                const getId = item._id
                candidateHolder.setAttribute("class","party_card")
                candidateHolder.innerHTML = `
                    <div class="party_card_info">
                        <div class="party_abt">
                            ${item.isVancant ? "" : `<div class='party_card_img isOccupy'>
                                <span>${item.currentParty.partyShortName}</span>
                            </div>`}
                            <div class="party_name">
                                <h3>${item.officeName}</h3>
                                <h3>${item.officeLevel}</h3>
                                <h3>${item.officeArm}</h3>
                                ${item.isVancant ? "" : `<h3>current • <span>${item.currentParty.partyName}</span></h3>`}
                            </div>
                        </div>
                        <div class="party_motto">
                            <h2>${item.officeDescription}</h2>
                        </div>
                    </div>
                    <div class="call_to_action">
                        ${datatwo.body.role !== "admin" ? `<button class='isAdmin join' id=${item._id}>contest</button>` : ""}
                        ${datatwo.body.role === "admin" ? `<button class='del' id=${item._id}>delete</button>` : ""}
                    </div>`
                document.querySelector(".party_lists").append(candidateHolder)
        })

        document.querySelectorAll(".join").forEach(item => item.addEventListener("click", (e) => {
                if(e.target.textContent === "edit") {
                    document.querySelector(".create_party_btn").classList.remove("hasParty")
                    partyHeaderText.textContent = "edit political party"
                    createPartyBtn.classList.remove("active")
                    editOfficeFunc(e.target.getAttribute("id"))
                }else {
                    document.querySelector(".create_party_btn").classList.remove("hasParty")
                    partyHeaderText.textContent = "Application Form"
                    createPartyBtn.classList.remove("active")
                    contestWrapper.classList.add("active")
                    goBackListBtn.classList.add("active")
                    listAllOfficeWrapper.classList.remove("active")
                    runForOfficeFunc(e.target.getAttribute("id"))
                }
        }))

        document.querySelectorAll(".del").forEach(item => item.addEventListener("click",(e) => {
            e.preventDefault()
            deleteOfficeFunc(e.target.getAttribute("id"))
        }))

    } catch (e) {
        isLoading(false,loader)
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

goBackListBtn.addEventListener("click",() => {
    getUserDashBoardData()
    contestOfficeArm.textContent = ''
    contestOfficeName.textContent = ''
    contestOfficeLevel.textContent = ''
    contestOfficeRole.textContent = ''
    contestOfficeBtn.setAttribute("id",'')
    contestWrapper.classList.remove("active")
})


// api functions

//  run for office
const runForOfficeFunc = async (id) => {
    try {
        const response = await fetch(`${base_url}${GETSPECIFICOFFICE}${id}`,runForOffice)

        if(!response.ok) {
            throw new Error("cant join party")
        }

        const data = await response.json()

        contestOfficeArm.textContent = data.body.officeArm
        contestOfficeName.textContent = data.body.officeName
        contestOfficeLevel.textContent = data.body.officeLevel
        contestOfficeRole.textContent = data.body.officeRole
        contestOfficeBtn.setAttribute("id",id)

    } catch (e) {
        console.error(e.message)
    }
}

const submitApplication = async (id) => {
    try {
        const response = await fetch(`${base_url}${CONTESTFOROFFICE}${id}`,{
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                campaignPromise: contestOfficeCampaignPromise.value
            })
        })

        if(!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        
        partyHeaderText.textContent = "List of Political Office(s)"
        createPartyBtn.classList.remove("active")
        contestWrapper.classList.remove("active")
        listAllOfficeWrapper.classList.add("active")

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = " Application successful"

        setTimeout(()=> {
            getUserDashBoardData()
        },1500)

        

    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message === "Failed to fetch" ? " You are Offline" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }
}


// eventlistners

window.addEventListener("load", () =>{
    //
    getUserDashBoardData()
})

openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)



createPartyBtn.addEventListener("click", () => {

    if(createPartyBtn.textContent === 'view offices') {
        createPartyBtn.textContent = 'Create office'
        listAllOfficeWrapper.classList.add('active')
        partyHeaderText.textContent = 'List of Office(s)'
        createPartyMenu.classList.remove('active')
        officeContestantsWrapper.classList.remove('active')
        getUserDashBoardData()
    }else {
        createPartyBtn.textContent = 'view offices'
        listAllOfficeWrapper.classList.remove('active')
        contestantLists.textContent = 'Candidate'
        partyHeaderText.textContent = 'Create Political Office'
        createPartyMenu.classList.add('active')
        officeContestantsWrapper.classList.remove('active')
    }

})

contestantLists.addEventListener("click", () => {
    if(contestantLists.textContent === 'view offices') {
        contestantLists.textContent = 'Candidate'
        listAllOfficeWrapper.classList.add('active')
        partyHeaderText.textContent = 'List of Office(s)'
        createPartyMenu.classList.remove('active')
        officeContestantsWrapper.classList.remove('active')
        getUserDashBoardData()
    }else {
        contestantLists.textContent = 'view offices'
        listAllOfficeWrapper.classList.remove('active')
        partyHeaderText.textContent = 'Candidates List'
        createPartyMenu.classList.remove('active')
        officeContestantsWrapper.classList.add('active')

        getCandidateList()
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




// get all political contestants
const getCandidateList = async () => {

    isLoading(true,loaderSub)

    errorDivHandler.classList.remove('show')

    try {

        const responseMega = await fetch(`${base_url}${GETUSER}`,method)
        const response = await fetch(`${base_url}${GETALLREGISTERED}`,method)

        if(!responseMega.ok || !response.ok) {
            isLoading(false,loaderSub)
            throw new Error(" Failed to get candidate")
        }
    

        isLoading(false,loaderSub)
    

        const data = await response.json()
        const datatwo = await responseMega.json()

        const trimmedName = datatwo.body.name.split(" ").splice(0,2).join(" ")
        const profileName = datatwo.body.name.split(" ").splice(0,2).map(item => {
                return item.slice(0,1).toUpperCase()
            }).join("")

        if(datatwo.body.hasAParty === false) {
            partyName.style.display = "none"
            document.querySelector(".create_party_btn").classList.remove("hasParty")
        }


        userName.textContent = trimmedName
        position.textContent = datatwo.body.role

        profileImg.textContent = profileName

        officeContestantsWrapper.innerHTML = `
            <div class="party_items">
                    <div class="party_list">
                    </div>
            </div>`

        if(data.body.length === 0) {
            const errorMessage = document.createElement("div")
            const errorMessageText = document.createElement("h1")
            errorMessageText.textContent = `no candidates available`
            errorMessage.setAttribute("class","noList")
            errorMessage.append(errorMessageText)
            document.querySelector(".party_list").append(errorMessage)
            return
        }    

         data.body.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt) 
        }).forEach(item => {
            const candidateHolder = document.createElement("div")
            candidateHolder.setAttribute("class","party_card")
            candidateHolder.innerHTML = `<div class="party_card_info">
                    <div class="contest_abt">
                        <div class="contest_card_img">
                            <span>${item.party.partyShortName}</span>
                        </div>
                        <div class="abt_contest">
                            <div class="contest_name">
                                <h3>${item.candidateId.name}</h3>
                                <h4>party • ${item.party.partyName}</h4>
                                <h5>position • ${item.positionID.officeName}</h5>
                                <p>level • ${item.positionID.officeLevel}</p>
                            </div>
                            <div>
                                <h2></h2>
                            </div>
                        </div>
                    </div>
                    <div class="party_motto">
                        <h2>${item.campaignPromise}</h2>
                    </div>
                </div>
                <div class="call_to_action">
                    ${!item.isAccepted ? `<button class='isAdmin join acceptCD' id=${item._id}>accept</button>` : ""}
                    ${!item.isAccepted ? `<button class='del rejectCD' id=${item._id}>reject</button>` : ""}
                </div>`

            document.querySelector(".party_list").append(candidateHolder)
        })

        document.querySelectorAll(".acceptCD").forEach(item => item.addEventListener("click", async (e) => {
            await acceptCandidateProposal(e.target.getAttribute("id"),e.target.textContent)
        }))
        document.querySelectorAll(".rejectCD").forEach(item => item.addEventListener("click", async (e) => {
            await acceptCandidateProposal(e.target.getAttribute("id"),e.target.textContent)
        }))
    } catch (e) {
        isLoading(false,loaderSub)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove('show')
        },3000)
    }
}


const acceptCandidateProposal = async (id,approvalOfAdmin) => {
    try {
        const response = await fetch(`${base_url}${ACCEPTCANDIDATE}${id}`,{
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                statusOfCandidate: approvalOfAdmin
            })
        })


        if(!response.ok) {
            throw new Error(` Failed to ${approvalOfAdmin} candidate`)
        }

        if(approvalOfAdmin === "reject") {
            popIcon.classList.remove("fa-circle-xmark")
            popIcon.classList.add("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = " Successful"
        }

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = " Successful"

        setTimeout(()=> {
            getCandidateList()
        },1500)


    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message === "Failed to fetch" ? " You are offline" : " " + e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }
}


// create political party
//admin only
const createPoliticalOffice = async () => {
    isLoading(true,createLoader)
    try {
        const response = await fetch(`${base_url}${CREATEOFFICE}`, 
            {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    officeName: postNewOfficeName.value,
                    officeRole: postNewOfficeRole.value,
                    officeLevel: postNewOfficeLevel.value,
                    officeArm: postNewOfficeArm.value,
                    officeDescription: postNewOfficeDescription.value
                })
            })


        if(!response.ok) {
            isLoading(false,createLoader)
            errorTextContent.textContent = "Failed to fetch"
            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)

            throw new Error(" Error creating new office")
        }

        
        isLoading(false,createLoader)

        createPartyMenu.classList.remove("active")
        listAllOfficeWrapper.classList.add("active")
        createPartyBtn.textContent = 'Create party'
        partyHeaderText.textContent = 'List of Office(s)'

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = "Success"

        setTimeout(()=> {
            getUserDashBoardData()
        },1500)


        postNewOfficeName.value = '',
        postNewOfficeRole.value = '',
        postNewOfficeDescription.value = ''

    } catch (e) {
        isLoading(false,loader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? "No internet" : e.message
        console.error(e.message)
    }
}

// delete political party
// admin only
const deleteOfficeFunc = async (id) => {
    try {
        const response = await fetch(`${base_url}${DELETEOFFICE}${id}`,deleteOfficeMethod)

        if(!response.ok) {
            throw new Error(" failed to delete office")
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
        errorTextContent.textContent = e.message === "Failed to fetch" ? " You are offline" : " " + e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        console.error(e.message)
    }
}

// edit political party
// admin only
// getInfo

/*
const editOfficeFunc = async (id) => {
    try {
        
        const response = await fetch(`${base_url}${GETSPECIFICPARTY}${id}`,method)

        if(!response.ok) {
            throw new Error("error getting office")
        }

        const data = await response.json()

        editPartyImg.style.backgroundColor = data.body.partyColor

        editPoliticalSaveBtn.setAttribute("id",id)

        editPartyHqAddress.textContent = data.body.hqAddress
        editPartyImg.textContent = data.body.partyShortName
        editPartyColor.textContent = data.body.partyColor
        editPartyMotto.textContent = data.body.partyMotto
        editPartyShortName.textContent = data.body.partyShortName
        editPartySlogan.textContent = data.body.partySlogan
        editPartyName.textContent = data.body.partyName

    } catch (e) {
        console.error(e.message)
    }
}

const submitEditedPartyFunction = async (id) => {
    try {
        const response = await fetch(`${base_url}${EDITPARTY}${id}`,editOfficeMethod)

        if(!response.ok) {
            throw new Error("error updating party")
        }

        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = " Promise must be made"

        editPoliticalParty.classList.remove("active")
        listAllOfficeWrapper.classList.add("active")

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserDashBoardData()
        },1500)

    } catch (e) {
        
        console.error(e.message)
    }
}


*/
// editPoliticalParty.classList.remove('active')

// eventlistners

openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)



/*
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

*/


// submitting btn

createNewOffice.addEventListener("click", (e) => {
    e.preventDefault()
    createPoliticalOffice()

})

contestOfficeBtn.addEventListener("click",(e) => {
    e.preventDefault()
    if(contestOfficeCampaignPromise.value === "") {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = " Promise must be made"
        contestOfficeCampaignPromise.style.borderColor = "rgb(255,0,0)"
        setTimeout(()=> {
            contestOfficeCampaignPromise.style.borderColor = "#ccc"
            errorDivHandler.classList.remove("show")
        },3000)

        return
    }

    submitApplication(e.target.getAttribute("id"))
})

document.querySelector(".log_out").addEventListener("click", logOutFunc)

