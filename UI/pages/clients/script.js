import { closeMenuBtn, openMenuBtn, openMenu ,closeMenu } from "../political/script.js";

import { base_url,url_endpoints } from '../../base.js'


openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)

const userName = document.querySelector('.header_info h2'),
    partyName = document.querySelector('.header_info h3'),
    profileImg = document.querySelector('.header_logo span');

const token = JSON.parse(localStorage.getItem("token"))

const api_options = {
    method: "GET",
    headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`
    }
}

const getProfile = async () => {
    try {
        const response = await fetch(`${base_url}${url_endpoints.user.getUser}`,api_options)

        if(!response.ok) {
            throw new Error("error getting user:" + response.status)
        }

        const data = await response.json()

        userName.textContent = data.name
        partyName.textContent = data.party === null ? 'member of the public' : data.party

        profileImg.textContent = data.name.slice(0,2)
    } catch (e) {
        console.error(e.message)
    }
}

window.addEventListener('load', getProfile)


getProfile()