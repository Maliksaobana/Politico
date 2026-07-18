import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu,convertToInput, convertToH_One, editTextarea,profileImg,userName,partyName,position,logOutFunc,isLoading} from "../baseExports.js"

import { base_url, url_endpoints } from "../base.js"


const { getUser:userProfileDetails } = url_endpoints.user
const { analysePetition } = url_endpoints.petition
const { getPetition } = url_endpoints.petition
const { getAllPetition } = url_endpoints.petition
const { analysePetition: ANALYSEPETITION } = url_endpoints.petition
const { declareWinner } = url_endpoints.winner
const { getAllWinners } = url_endpoints.winner
const { getAllCand } = url_endpoints.vote
const { getAllParty } = url_endpoints.party
const { getAllOffice } = url_endpoints.office

const token = JSON.parse(localStorage.getItem("token"))

const loader = document.querySelector(".pageLoader"),
    errorDivHandler = document.querySelector(".errModal"),
    popIcon = errorDivHandler.querySelector(".fa-regular"),
    errorTextContent = errorDivHandler.querySelector(".errModal h1 span"),
    mainDashBoardWrapper = document.querySelector(".dash_wrapper"),
    mainContentWrapper = document.querySelector(".main_content"),




    // for numbers of items

    partyNumber = document.querySelector(".party"),
    officeNumber = document.querySelector(".office"),
    candidateNumber = document.querySelector(".candidate"),

    // for winners section

    winnerOverflowWrapper = document.querySelector(".winner_block"),


    // for petition section
    petitionOverflowWrapper = document.querySelector(".petition_block"),
    petitionDashBoardWrapper = document.querySelector(".petition_details"),

    // get petion details
    complainerDetailsName = document.querySelector(".complainer_details h2 span"),
    complainerDetailsParty = document.querySelector(".complainer_details h3"),
    complainerDetailsPosition = document.querySelector(".complainer_details h4"),
    titleOfPetition = document.querySelector(".title_of_petition span"),
    getTheReasonForPetition = document.querySelector(".get_the_reason"),


    closePetition = document.querySelector(".close_petition")

const method = {
    method: "GET",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

const getCurrentUserDashBoardData = async () => {
    
    isLoading(true,loader)

    while (winnerOverflowWrapper.firstChild){
        winnerOverflowWrapper.removeChild(winnerOverflowWrapper.firstChild)
    }
    while (petitionOverflowWrapper.firstChild){
        petitionOverflowWrapper.removeChild(petitionOverflowWrapper.firstChild)
    }

    mainDashBoardWrapper.classList.remove("showing_petition")
    petitionDashBoardWrapper.classList.remove("showing_petition")
    errorDivHandler.classList.remove("show")

    try {
        const response = await fetch(`${base_url}${userProfileDetails}`,method)
        const petitionResponse = await fetch(`${base_url}${getAllPetition}`,method)
        const winnerResponse = await fetch(`${base_url}${getAllWinners}`,method)
        const countPartyResponse = await fetch(`${base_url}${getAllParty}`,method)
        const countCandidateResponse = await fetch(`${base_url}${getAllCand}`,method)
        const countOfficeResponse = await fetch(`${base_url}${getAllOffice}`,method)

        if(!response.ok) {
            isLoading(false,loader)
            const data = await response.json()
            throw new Error(response.message)
        }
        isLoading(false,loader)

        mainContentWrapper.classList.remove("active")

        const data = await response.json()
        const winnerData = await winnerResponse.json()
        const petitionData = await petitionResponse.json()
        const countPartyData = await countPartyResponse.json()
        const countOfficeData = await countOfficeResponse.json()
        const countCandidateData = await countCandidateResponse.json()

        const trimmedName = data.body.name.split(" ").splice(0,2).join(" ")
        const profileName = data.body.name.split(" ").splice(0,2).map(item => {
                return item.slice(0,1).toUpperCase()
            }).join("")

        if(data.body.hasAParty === false) {
            partyName.style.display = "none"
        }else {
            partyName.textContent = data.body.party.partyShortName
        }

        userName.textContent = trimmedName
        position.textContent = data.body.role

        profileImg.textContent = profileName

        const totalPartyLength = countPartyData.body.length
        const totalOfficeLength = countOfficeData.body.length
        const totalCandidateLength = countCandidateData.body.length

        partyNumber.textContent = totalPartyLength < 10 ? '0' + totalPartyLength : totalPartyLength
        candidateNumber.textContent = totalCandidateLength < 10 ? "0" + totalCandidateLength : totalCandidateLength
        officeNumber.textContent = totalOfficeLength < 10 ? "0"+totalOfficeLength : totalOfficeLength


        winnerData.body.forEach(item => {
            const newWinners = document.createElement("div")
            newWinners.setAttribute('class',"get_info")

            newWinners.innerHTML = `
                <div class="informant_header">
                    <h2>winner</h2>
                    <div class="more_details">
                        <h3>Crucial win for ${item.party.partyName}</h3>
                    </div>
                </div>
                <div class="informant_details">
                    <h4>${item.party.partyShortName} running candidate ${item.candidateContesting.name} has emerged winner for the office of ${item.officeContesting.officeName}. The party now has ground on the ${item.officeContesting.officeArm} arm, boosting their stands on the ${item.officeContesting.officeLevel} in the country</h4>
                </div>`

            winnerOverflowWrapper.append(newWinners)

        })

        petitionData.body.filter(item => item.petitionFeedBack !== true).forEach(item => {
            const newItem = document.createElement("div")

            newItem.setAttribute("class","get_info")

            newItem.innerHTML = `
                <div class="petite_abt">
                    <div class="petite_title">
                        <h4>New petition</h4>
                    </div>
                    <div class="petite_details">
                        <div class="petite_head">
                            <p>Petition has been made against ${item.onWhichCandidate.name} from party ${item.onWhichParty.partyShortName} running for the office of ${item.onWhichPosition.officeName}. <span class="read_more"><a id=${item._id}>Read details</a></span></p>
                        </div>
                    </div>
                </div>
                ${data.body.role === 'admin' ? `
                <div class="petite_btn">
                    <button class="reject_btn" id=${item._id}>
                        reject
                    </button>
                    <button class="accept_btn" id=${item._id}>
                        accept
                    </button>
                </div>` : ""}`


            petitionOverflowWrapper.append(newItem)
        })

        const petitionReadMore = document.querySelectorAll(".read_more")
        const petitionRejectBtn = document.querySelectorAll(".reject_btn")
        const petitionAcceptBtn = document.querySelectorAll(".accept_btn")

        petitionReadMore.forEach(item =>{ 
            item.addEventListener("click", (e) => {
                mainDashBoardWrapper.classList.toggle("showing_petition")
                petitionDashBoardWrapper.classList.toggle("showing_petition")
                getPetitionFullDetails(e.target.getAttribute("id"))
            })
        })
        petitionRejectBtn.forEach(item =>{ 
            item.addEventListener("click", (e) => {
                adminPetitionRemark(e.target.getAttribute("id"),e.target.textContent)
            })
        })
        petitionAcceptBtn.forEach(item =>{ 
            item.addEventListener("click", (e) => {
                adminPetitionRemark(e.target.getAttribute("id"),e.target.textContent)
            })
        })

    } catch (e) {
        isLoading(false,loader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message === "Failed to fetch" ? " You are offline" : " " + e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)

        console.log(e.message)
    }
} 


window.addEventListener("load",()=>{
    getCurrentUserDashBoardData()
})


closeMenuBtn.addEventListener('click', closeMenu)

openMenuBtn.addEventListener('click', openMenu)

document.querySelector(".log_out").addEventListener("click", logOutFunc)

const getPetitionFullDetails = async (id) => {
    try {
        const response = await fetch(`${base_url}${getPetition}${id}`,{
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if(!response.ok) {
            throw new Error("error getting details")
        }

        const data = await response.json()

        complainerDetailsName.textContent = data.body.whoMadePetition.name
        complainerDetailsParty.textContent = data.body.whoMadePetition.party === null ? "Member of the public" : data.body.whoMadePetition.partyShortName
        complainerDetailsPosition.textContent = data.body.whoMadePetition.role === "member" ? "" : data.body.whoMadePetition.role
        getTheReasonForPetition.textContent = data.body.reasonForPetition
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

const adminPetitionRemark = async (id,petitionRemark) => {
    try {
        const response = await fetch(`${base_url}${ANALYSEPETITION}${id}`,{
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adminRemark: petitionRemark
            })
        })

        if(petitionRemark !== "accept") {
            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = ' Successful'
        }else {
            popIcon.classList.remove("fa-circle-xmark")
            popIcon.classList.add("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.add('success')
            errorTextContent.textContent = ' Successful'
        }

        setTimeout(()=> {
            getCurrentUserDashBoardData()
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

closePetition.addEventListener("click", () => {
    mainDashBoardWrapper.classList.remove("showing_petition")
    petitionDashBoardWrapper.classList.remove("showing_petition")
})

/*
<div class="get_info">
                                    <div class="petite_abt">
                                        <div class="petite_title">
                                            <h4>New petition</h4>
                                        </div>
                                        <div class="petite_details">
                                            <div class="petite_head">
                                                <p>Petition has been made against <span class="candidate_name">malik</span> from party <span class="party_name">pdp</span> running for the office of <span class="office_name"></span>minister of finance. <span class="read_more"><a>Read details</a></span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="petite_btn">
                                            <button class="reject_btn">
                                                reject
                                            </button>
                                            <button class="accept_btn">
                                                accept
                                            </button>
                                    </div>
                                </div>


*/


/*
<div class="get_info">
                                    
                                </div>

*/