// api end point

import { base_url, url_endpoints } from "../base.js"
import { isLoading } from "../baseExports.js"


const { signup:signUpAuth } = url_endpoints.user


const signUpBtn = document.querySelector(".sign_up"),
    wrapper = document.querySelector('.signup_wrapper'),
    postUserConfirmedPassword = document.querySelector('.confirm'),
    postUserPassword = document.querySelector('[type=password]'),
    postUserEmail = document.querySelector('[type=email]'),
    postUserName = document.querySelector('[type=text]'),
    postAdminToken = document.querySelector('.admin_token'),
    loaderSpinner = document.querySelector(".loader"),
    errorDivHandler = document.querySelector(".errModal"),
    errorTextContent = document.querySelector(".errModal h1 span")


let timeOut = ''

const signInUser = async () => {
    const body = {
        name: postUserName.value,
        email: postUserEmail.value,
        password: postUserConfirmedPassword.value,
        adminToken: postAdminToken.value,
    }

    await isLoading(true,loaderSpinner)

    
    try {
        const response = await fetch(`${base_url}${signUpAuth}`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })

        if(!response.ok) {
            await isLoading(false,loaderSpinner)
            const data = await response.json()

            throw new Error(data.message)

        }

        await isLoading(false,loaderSpinner)
        
        const data = await response.json()

        const setToken = localStorage.setItem('token',JSON.stringify(data.body.token))

        window.location.pathname = "/HomeView/home.html"

    } catch (e) {
        await isLoading(false,loaderSpinner)
            
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = e.message == "Failed to fetch" ? " You are offline" : " " + e.message

        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }

}


signUpBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if(timeOut !== "") {
        clearTimeout(timeOut)
    }
    

    if(postUserEmail.value.trim() === '' && postUserPassword.value.trim() === '' && postUserName.value.trim() === '') {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Fields must not be empty!!'
        postUserEmail.parentElement.classList.add('err')
        postUserName.parentElement.classList.add('err')
        postUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserEmail.parentElement.classList.remove('err')
            postUserName.parentElement.classList.remove('err')
            postUserPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if (!postUserEmail.value.includes('@')) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Email must include @'
        postUserEmail.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserEmail.parentElement.classList.remove('err')
        },3000)

        return
    }else if (postUserPassword.value.trim() === '' || postUserPassword.value.length <= 3) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password must be greater than 3'
        postUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserPassword.parentElement.classList.remove('err')
        },3000)

        return
    }else if (postUserPassword.value !== postUserConfirmedPassword.value) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password not the same'
        postUserPassword.parentElement.classList.add('err')
        postUserConfirmedPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserPassword.parentElement.classList.remove('err')
            postUserConfirmedPassword.parentElement.classList.remove('err')
        },3000)

        return
    }else {
        postUserEmail.parentElement.classList.add('good')
        postUserPassword.parentElement.classList.add('good')
        postUserName.parentElement.classList.add('good')
        postAdminToken.parentElement.classList.add('good')
        postUserConfirmedPassword.parentElement.classList.add('good')
    }
    
    signInUser()

    // console.log(postAdminToken.value)
})

window.addEventListener("keydown", (e) => {
    if(e.key !== "Enter") {
        return
    }

    if(timeOut !== "") {
        clearTimeout(timeOut)
    }
    

    if(postUserEmail.value.trim() === '' && postUserPassword.value.trim() === '' && postUserName.value.trim() === '') {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Fields must not be empty!!'
        postUserEmail.parentElement.classList.add('err')
        postUserName.parentElement.classList.add('err')
        postUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserEmail.parentElement.classList.remove('err')
            postUserName.parentElement.classList.remove('err')
            postUserPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if (!postUserEmail.value.includes('@')) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Email must include @'
        postUserEmail.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserEmail.parentElement.classList.remove('err')
        },3000)

        return
    }else if (postUserPassword.value.trim() === '' || postUserPassword.value.length <= 3) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password must be greater than 3'
        postUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserPassword.parentElement.classList.remove('err')
        },3000)

        return
    }else if (postUserPassword.value !== postUserConfirmedPassword.value) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password not the same'
        postUserPassword.parentElement.classList.add('err')
        postUserConfirmedPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            postUserPassword.parentElement.classList.remove('err')
            postUserConfirmedPassword.parentElement.classList.remove('err')
        },3000)

        return
    }else {
        postUserEmail.parentElement.classList.add('good')
        postUserPassword.parentElement.classList.add('good')
        postUserName.parentElement.classList.add('good')
        postAdminToken.parentElement.classList.add('good')
        postUserConfirmedPassword.parentElement.classList.add('good')
    }
    
    signInUser()
})