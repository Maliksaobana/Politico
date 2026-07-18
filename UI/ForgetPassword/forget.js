import { base_url,url_endpoints } from "../base.js"
import {isLoading} from "../pages/baseExports.js"

const {password:forgetPasswordUrl} = url_endpoints.user

const token = JSON.parse(localStorage.getItem('token'))




const confirmNewPassword = document.querySelector(".confirm"),
    createNewPassword = document.querySelector("[type=password]"),
    wrapper = document.querySelector('.forget_wrapper'),
    confirmPasswordBtn = document.querySelector(".confirm_btn"),
    errorDivHandler = document.querySelector(".errModal"),
    loaderSpinner = document.querySelector(".loader"),
    errorTextContent = document.querySelector(".errModal h1 span")

let timeOut = ""


const editUserPassword = async () => {
    const body = {
        password: confirmNewPassword.value
    }

    await isLoading(true,loaderSpinner)

    try {
        const confirmChangeOfPassword = await fetch(`${base_url}${forgetPasswordUrl}`,{
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })

        if(!confirmChangeOfPassword.ok) {
            await isLoading(false,loaderSpinner)
                        
            errorDivHandler.classList.add('show')
            errorTextContent.textContent = `${response.message}`
            
            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)
            
            throw new Error(`${response.status}: unable to register user try agin`)
        }

        await isLoading(false,loaderSpinner)

        window.location.pathname = "/UI/SIgnIn/signin.html"

        sessionStorage.clear()

    } catch (e) {
        await isLoading(false,loaderSpinner)
                    
        errorDivHandler.classList.add('show')

        errorTextContent.textContent = e.message == "Failed to fetch" ? " You are offline" : e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }
}


confirmPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if(timeOut !== "") {
        clearTimeout(timeOut)
    }
    

    if(createNewPassword.value.trim() === '') {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password is blank'
        createNewPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            createNewPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if(createNewPassword.value.length < 3) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password must be greater than 3'
        createNewPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            createNewPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if (createNewPassword.value !== confirmNewPassword.value) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Passwords do not match.'
        createNewPassword.parentElement.classList.add('err')
        confirmNewPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            createNewPassword.parentElement.classList.remove('err')
            confirmNewPassword.parentElement.classList.remove('err')
        },3000)

        return
    }else {
        createNewPassword.parentElement.classList.add('good')
        confirmNewPassword.parentElement.classList.add('good')
    }
    
    editUserPassword()
})

window.addEventListener("keydown", (e) => {
    if(e.key !== "Enter") return

    if(timeOut !== "") {
        clearTimeout(timeOut)
    }
    
    if(createNewPassword.value.trim() === '') {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password is blank'
        createNewPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            createNewPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if(createNewPassword.value.length < 3) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password must be greater than 3'
        createNewPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            createNewPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if (createNewPassword.value !== confirmNewPassword.value) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Passwords do not match.'
        createNewPassword.parentElement.classList.add('err')
        confirmNewPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            createNewPassword.parentElement.classList.remove('err')
            confirmNewPassword.parentElement.classList.remove('err')
        },3000)

        return
    }else {
        createNewPassword.parentElement.classList.add('good')
        confirmNewPassword.parentElement.classList.add('good')
    }
    
    editUserPassword()
})

