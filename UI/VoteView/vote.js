import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu,convertToInput, convertToH_One, editTextarea,profileImg,userName,partyName,position,isLoading,logOutFunc} from "../baseExports.js"

import { base_url, url_endpoints } from "../base.js"

const {getAllCand} = url_endpoints.vote 
const {getCand} = url_endpoints.vote 
const {getUser:GETUSER} = url_endpoints.user
const {castPersonalVote} = url_endpoints.vote
const {declareWinner} = url_endpoints.winner
const {makePetition} = url_endpoints.petition
const {getPetition} = url_endpoints.petition



const token = JSON.parse(localStorage.getItem("token"))

const adminInfoHeader = document.querySelector('.admin_info h1'),
    adminInfoSubHeader = document.querySelector('.admin_info h2'),
    postpetitionTopic = document.querySelector(".petitionTopic"),
    postpetitionLocation = document.querySelector(".petitionLocation"),
    postpetitionParty = document.querySelector(".petitionParty"),
    postpetitionOffice = document.querySelector(".petitionOffice"),
    postpetitionMessage = document.querySelector(".textarea_field"),
    errorDivHandler = document.querySelector(".errModal"),
    errorTextContent = errorDivHandler.querySelector(".errModal h1 span"),
    pageLoader = document.querySelector(".pageLoader"),
    popIcon = document.querySelector(".fa-regular"),
    petitionProfileImg = document.querySelector(".profile_img span")

const method = {
    method: "GET",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

const vote = {
    vote: 1
}

const castVote = {
    method: "PATCH",
    headers: {
        "authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote)
}




const ContestWinner = {
    method: "PATCH",
    headers: {
        "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
        vote: "1"
    })
}
const createNewPetition = {
    method: "POST",
    headers: {
        "authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        petitionTopic: postpetitionTopic.value,
        petitionLocation: postpetitionLocation.value,
        petitionOffice: postpetitionOffice.value,
        petitionMessage:postpetitionMessage.value,
    })
}



const mainWrapper = document.querySelector('.vote_wrapper')
const petitionWrapper = document.querySelector('.feed_wrapper')

const getUser = async () => {
    isLoading(true,pageLoader)
     errorDivHandler.classList.remove("show")
    
    try {
        const response = await fetch(`${base_url}${GETUSER}`,method)
        const responsetwo = await fetch(`${base_url}${getAllCand}`,method)

        if(!response.ok || !responsetwo.ok ) {
            isLoading(false,pageLoader)
            popIcon.classList.add("fa-circle-xmark")
            popIcon.classList.remove("fa-circle-check")
            errorDivHandler.classList.add('show')
            errorTextContent.parentElement.classList.remove('success')
            errorTextContent.textContent = " Error loading page"

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)

            throw new Error("Expired token")
        }
        isLoading(false,pageLoader)

        const data = await responsetwo.json()
        const datatwo = await response.json()

        const trimmedName = datatwo.body.name.split(" ").splice(0,2).join(" ")
        const profileName = datatwo.body.name.split(" ").splice(0,2).map(item => {
                return item.slice(0,1).toUpperCase()
            }).join("")

        if(datatwo.body.hasAParty === false) {
            partyName.style.display = "none"
            petitionProfileImg.style.backgroundColor = datatwo.body.party !== null ? datatwo.body.party.partyColor : "#abdaf7"
            petitionProfileImg.textContent = profileName
        }else {
            partyName.textContent = datatwo.body.party.partyShortName
        }


        userName.textContent = trimmedName
        position.textContent = datatwo.body.role

        adminInfoHeader.textContent = userName.textContent
        adminInfoSubHeader.textContent = datatwo.body.hasAParty === false ? "member of the public" : datatwo.body.role
        petitionProfileImg.style.backgroundColor = datatwo.body.party !== null ? datatwo.body.party.partyColor : "#abdaf7"
        petitionProfileImg.textContent = datatwo.body.party !== null ? datatwo.body.party.partyShortName : profileName

        profileImg.textContent = profileName

        mainWrapper.innerHTML = `
            <div class="vote_header">
                <p>“It is the duty of every citizen according to his best capacities to give validity to his convictions in political affairs.” Albert Einstein</p>
            </div>
            <div class="bodyVote">
                <div class="forVoting">
                    <h1>${datatwo.body.role !== "admin"? "cast your vote" : "Confirm result" }</h1>
                    <h5>${datatwo.body.role !== "admin"? "one person one vote" : "Let truth prevail" }</h5>
                </div>
                <div class="electorate_holder">
                    
                </div>
            </div>`

        if(data.body.length === 0) {
            const errorMessage = document.createElement("div")
            const errorMessageText = document.createElement("h1")
            errorMessageText.textContent = `no candidate ${datatwo.body.role === "admin" ? "• add one": ""}`
            errorMessage.setAttribute("class","noList")
            errorMessage.append(errorMessageText)
            document.querySelector(".electorate_holder").append(errorMessage)
            return
        }


        let checkBoolean = datatwo.body.petitionStatus === "has not submitted" ? false : true


         data.body.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt) 
        }).forEach(item => {
            const cardHolder = document.createElement("div")
            cardHolder.setAttribute("class","vote_card")
            cardHolder.innerHTML = `
                <div class="aspirants_info">
                    <div class="party_info">
                        <div class="party_img">
                            <span>${item.partyID.partyShortName}</span>
                        </div>
                        <div class="aspirants_name">
                            <h3><a href="">${item.candidateID.name}</a></h3>
                            <h4><a href="">${item.partyID.partyName}</a></h4>
                            <p>total votes • <span>${item.totalVotes}</span></p>
                            ${item.statusOfElection !== "contesting" ? `<p class="win">winner</p>` : ""}
                        </div>
                        <div class="position">
                            <h5>${item.positionID.officeName}</h5>
                        </div>
                    </div>
                    <div class="political_proposition">
                        <h2>${item.candidate.campaignPromise}</h2>
                    </div>
                </div>
                <div class="call_to_action">
                    ${item.positionID.isVancant  ? `<button class="vote_btn" id=${item._id}>${datatwo.body.role !== "admin" ? "<span class='voteLoader isnotLoading'></span>vote" : `<span class='winnerLoader isnotLoading'></span>${item.statusOfElection === "winner" ? "winner" : "declare winner"}`}</button>` : ""}
                    ${datatwo.body.role !== "admin" ? 
                    `<button  class='petition_btn' id=${item._id}>${datatwo.body.petitionStatus === "has not submitted" ? "petition" : datatwo.body.petitionStatus }</button>` 
                    : ""}
                </div>`

            document.querySelector(".electorate_holder").append(cardHolder)
        })

        document.querySelectorAll(".vote_btn").forEach(item => item.addEventListener("click",(e) => {
            if(document.querySelector(".vote_btn").textContent !== "vote") {
                declareContestantsWinner(e.target.getAttribute('id'))
            }else {
                const findVotes = datatwo.body.votedParticipatedOn.find(item => {
                    return e.target.getAttribute("id") === item.voteRef
                })
                castVoteFunc(e.target.getAttribute('id'))
            }

        }))
        document.querySelectorAll(".petition_btn").forEach(item => item.onclick = (e) => {

            if(e.target.textContent !== "petition") {
                return
            }
            mainWrapper.classList.add("query")
            petitionWrapper.classList.remove("query")
            getPetitionField(e.target.getAttribute("id"))
        })
    } catch (e) {
        isLoading(false,pageLoader)
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " No internet" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        
    }
} 


openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)


const castVoteFunc = async (id) => {
    await isLoading(true,document.querySelector(".voteLoader"))
    try {
        const response = await fetch(`${base_url}${castPersonalVote}${id}`,castVote)

        if(!response.ok) {
    
            await isLoading(false,document.querySelector(".voteLoader"))
            const data = await response.json()
            throw new Error(data.message) 
        } 

        await isLoading(false,document.querySelector(".voteLoader"))

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = " Successfully voted"

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)

        await getUser()
    } catch (e) {

        await isLoading(false,document.querySelector(".voteLoader"))

        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " You are offline" : " Task Failed"

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }
}


const declareContestantsWinner = async (id) => {
    try {
        const response = await fetch(`${base_url}${declareWinner}${id}`,{
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                winnerOfElection: "winner"
            })
        })

        if(!response.ok) {
            const data = await response.json()
            throw new Error(data.message)
        }

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = ' Successful'

        setTimeout(()=> {
            getUser()
        },3000)

    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " You are offline" : " " + e.message
        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }
}


// submiting petition
const submitPetition = async (id) => {

    await isLoading(true,document.querySelector(".loader"))

    try {
        const response = await fetch(`${base_url}${makePetition}${id}`,
            {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        petition: 'petition', 
                        reasonForPetition: document.querySelector(".MP").value
                    }
                )
            }
        )

        if(!response.ok) {
            await isLoading(false,document.querySelector(".loader"))
            const data = await response.json()
            throw new Error(data.message)
        }

        await isLoading(false,document.querySelector(".loader"))

        popIcon.classList.remove("fa-circle-xmark")
        popIcon.classList.add("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.add('success')
        errorTextContent.textContent = " Petition submitted"

        mainWrapper.classList.remove("query")
        petitionWrapper.classList.add("query")
        
        setTimeout(()=>{
            getUser()
        },1500)
    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " You are offline" : " " + e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        
    }
}

const getPetitionField = async (id) => {
    try {
        const response = await fetch(`${base_url}${getCand}${id}`,
            {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )

        if(!response.ok) {
            throw new Error("Cant get Information")
        }

        const data = await response.json()

        postpetitionLocation.value = data.body.candidateID.name
        postpetitionParty.value = data.body.partyID.partyName
        postpetitionOffice.value = data.body.positionID.officeName
        document.querySelector(".feed_save_btn").setAttribute("id",id)
        
    } catch (e) {
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " You are offline" : " " + e.message
        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
        
    }
}

document.querySelector(".feed_save_btn").addEventListener("click", (e) => {
    e.preventDefault()

    if(document.querySelector(".MP").value === '') {

        document.querySelector(".MP").style.borderColor = "rgb(255,0,0)"
        popIcon.classList.add("fa-circle-xmark")
        popIcon.classList.remove("fa-circle-check")
        errorDivHandler.classList.add('show')
        errorTextContent.parentElement.classList.remove('success')
        errorTextContent.textContent = " Field not filled"
        
        setTimeout(()=> {
            document.querySelector(".MP").style.borderColor = "#ccc"
            errorDivHandler.classList.remove("show")
        },3000)

        return
    }

    submitPetition(e.target.getAttribute("id"))
})



document.querySelector(".log_out").addEventListener("click", logOutFunc)

window.addEventListener("load",()=> {
    //
    getUser()
})