import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu,convertToInput, convertToH_One, editTextarea,profileImg,userName,partyName,position,isLoading,logOutFunc} from "../baseExports.js"

import { base_url, url_endpoints } from "../base.js"


const {getUser:GETUSER} = url_endpoints.user
const {editUser: EDITUSER} = url_endpoints.user

const token = JSON.parse(localStorage.getItem("token"))

const method = {
    method: "GET",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}



const saveLoader= document.querySelector(".loader"),
    logInUserIsPolitician = document.querySelector(".isPolitician"),
    logInUserHistory = document.querySelector(".history"),
    logInUserProfileImg = document.querySelector(".profile_img span"),
    logInPartyName = document.querySelector(".partyName"),
    logInPartySlogan = document.querySelector(".partySlogan"),
    logInPartyMotto = document.querySelector(".partyMotto"),
    saveNewUpdate = document.querySelector(".save_new_update"),
    userNameInitial = document.querySelector(".IN"),


    //for table usage
    logInPoliticalHistory = document.querySelector(".polHistory"),
    logInVoteHistory = document.querySelector(".voteHistory"),
    errorDivHandler = document.querySelector(".errModal"),
    popIcon = document.querySelector(".fa-regular"),
    errorTextContent = errorDivHandler.querySelector(".errModal h1 span")







const getUser = async () => {
    errorDivHandler.classList.remove("show")
    saveNewUpdate.disabled = true
    try {
        const response = await fetch(`${base_url}${GETUSER}`,method)


        if(!response.ok) {
            const error = await response.json()
            throw new Error("Expired token")
        }

        const data = await response.json()

        const trimmedName = data.body.name.split(" ").splice(0,2).join(" ")
        const profileName = data.body.name.split(" ").splice(0,2).map(item => {
                return item.slice(0,1).toUpperCase()
            }).join("")


        if(data.body.hasAParty === false) {
            partyName.style.display = "none"
        }else {
            partyName.textContent = data.body.party.partyShortName
        }

        if(data.body.role !== "admin") {
            logInUserHistory.classList.remove("active")
        }


        userName.textContent = trimmedName
        userNameInitial.textContent = userName.textContent
        position.textContent = data.body.role

        profileImg.textContent = profileName
        logInUserProfileImg.textContent = profileImg.textContent

        logInPartyName.textContent = data.body.party !== null ? data.body.party.partyName : "NK:NK"
        logInPartySlogan.textContent = data.body.party !== null ? data.body.party.partySlogan : "NK:NK" 
        logInPartyMotto.textContent = data.body.party !== null ? data.body.party.partyMotto : "NK:NK"

        data.body.votedParticipatedOn.forEach((item,i) => {
            const newTableRow = document.createElement("tr"),
                SN = document.createElement("td"),
                politicalPosition = document.createElement("td"),
                aspirant = document.createElement("td"),
                party = document.createElement("td")

            
            SN.textContent = i + 1
            politicalPosition.textContent = item.officeVotedFor.officeName
            aspirant.textContent = item.candidatedVotedFor.name
            party.textContent = item.partyVotedFor.partyShortName

            newTableRow.append(SN,politicalPosition,aspirant,party)
            logInVoteHistory.append(newTableRow)
        }) 


        if(data.body.role !== "politician") {
            logInUserIsPolitician.classList.add("active")
            return
        }

        logInUserIsPolitician.classList.remove("active")

        data.body.officesHeld.forEach((item,i) => {
            const newTableRow = document.createElement("tr"),
                S_N = document.createElement("td"),
                electedPosition = document.createElement("td")

            
            SN.textContent = i + 1
            electedPosition.textContent = item.officeVotedFor.officeName


            newTableRow.append(SN,electedPosition)
            logInPoliticalHistory.append(newTableRow)
        })


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

window.addEventListener("load",()=> {
    //
    getUser()
})

const editUserNewName = async () => {
    await isLoading(true,saveLoader)
    try {

        const response = await fetch(`${base_url}${EDITUSER}`,{
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.querySelector(".userData").textContent
            })
        })

        if(!response.ok) {
            await isLoading(false,saveLoader)

            throw new Error("error saving new user name")
        }

        await isLoading(false,saveLoader)

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = " Saved"

        setTimeout(()=> {
            getUser()
        },1500)
        
    } catch (e) {
        await isLoading(false,saveLoader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.classList.remove('success')
        errorTextContent.textContent = e.message == " Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        console.error(e.message)
    }
}

saveNewUpdate.onclick = (e) => {
    e.preventDefault()

    editUserNewName()
}

openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)






const editButtons = document.querySelectorAll('.admin_edit_icon')

const profileEditBtn = document.querySelector(".edit_icon")


profileEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if(e.target.getAttribute('class') === 'fa-solid fa-pencil') {
        convertToInput(e)
    }else {
        convertToH_One(e)
    }

    saveNewUpdate.disabled = false
})


document.querySelector(".log_out").addEventListener("click", logOutFunc)

// getUser()

            /* popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.classList.remove('success')
            errorTextContent.textContent = ""
            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000) */