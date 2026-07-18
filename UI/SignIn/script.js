import { base_url, url_endpoints } from "../base.js"
import { isLoading } from "../baseExports.js"


const { signIn:signInAuth } = url_endpoints.user


const getUserEmail = document.querySelector("[type=email]"),
    getUserPassword = document.querySelector("[type=password]"),
    wrapper = document.querySelector('.signin_wrapper'),
    loaderSpinner = document.querySelector(".loader"),
    errorDivHandler = document.querySelector(".errModal"),
    errorTextContent = document.querySelector(".errModal h1 span"),
    logInBtn = document.querySelector(".log_in")

let timeOut = ''




const logUser = async () => {
    const body = {
        email: getUserEmail.value,
        password: getUserPassword.value
    }

    await isLoading(true,loaderSpinner)


    try {
        const response = await fetch(`${base_url}${signInAuth}`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!response.ok) {
            throw new Error(`${response.status}: unable to login user, try agin`)

            await isLoading(false,loaderSpinner)

            errorDivHandler.classList.add('show')
            errorTextContent.textContent = `${response.message}`

            setTimeout(()=> {
                errorDivHandler.classList.remove("show")
            },3000)

        }

        await isLoading(false,loaderSpinner)

        const data = await response.json()

        const getToken = localStorage.setItem('token',JSON.stringify(data.body.token))

        window.location.pathname = "./UI/HomeView/home.html"

    } catch (e) {

        await isLoading(false,loaderSpinner)
                    
        errorDivHandler.classList.add('show')

        errorTextContent.textContent = e.message == "Failed to fetch" ? "You are offline" : e.message
        
        setTimeout(()=> {
            errorDivHandler.classList.remove("show")
        },3000)
    }

}




logInBtn.addEventListener("click", (e) => {
    e.preventDefault()
   
    if(timeOut !== "") {
        clearTimeout(timeOut)
    }


    if(getUserEmail.value.trim() === '' && getUserPassword.value.trim() === '') {
        errorDivHandler.classList.add("show")
        errorTextContent.textContent = " Fill in Fields"
        getUserEmail.parentElement.classList.add('err')
        getUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserEmail.parentElement.classList.remove('err')
            getUserPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if (!getUserEmail.value.includes('@')) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Email must include @'
        getUserEmail.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserEmail.parentElement.classList.remove('err')
        },3000)

        return
    }else if (getUserPassword.value.trim() === '' || getUserPassword.value.length < 4) {
        if(getUserPassword.value.trim() === '') {
            errorDivHandler.classList.add('show')
            errorTextContent.textContent = ' Input password'

            timeOut = setTimeout(()=> {
                errorDivHandler.classList.remove("show")
                getUserPassword.parentElement.classList.remove('err')
            },5000)
            return 
        }
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password must be greater than 3'
        getUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserPassword.parentElement.classList.remove('err')
        },5000)

        return
    }else {
        getUserEmail.parentElement.classList.add('good')
        getUserPassword.parentElement.classList.add('good')
    }
    
    logUser()
})


window.addEventListener("keydown", (e) => {
    if(e.key !== "Enter") {
        return
    }

    if(timeOut !== "") {
        clearTimeout(timeOut)
    }


    if(getUserEmail.value.trim() === '' && getUserPassword.value.trim() === '') {
        errorDivHandler.classList.add("show")
        errorTextContent.textContent = " Fill in Fields"
        getUserEmail.parentElement.classList.add('err')
        getUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserEmail.parentElement.classList.remove('err')
            getUserPassword.parentElement.classList.remove('err')
        },3000)

        return

    }else if (!getUserEmail.value.includes('@')) {
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Email must include @'
        getUserEmail.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserEmail.parentElement.classList.remove('err')
        },3000)

        return
    }else if (getUserPassword.value.trim() === '' || getUserPassword.value.length < 4) {
        if(getUserPassword.value.trim() === '') {
            errorDivHandler.classList.add('show')
            errorTextContent.textContent = ' Input password'

            timeOut = setTimeout(()=> {
                errorDivHandler.classList.remove("show")
                getUserPassword.parentElement.classList.remove('err')
            },5000)
            return 
        }
        errorDivHandler.classList.add('show')
        errorTextContent.textContent = ' Password must be greater than 3'
        getUserPassword.parentElement.classList.add('err')

        timeOut = setTimeout(()=> {
            errorDivHandler.classList.remove("show")
            getUserPassword.parentElement.classList.remove('err')
        },5000)

        return
    }else {
        getUserEmail.parentElement.classList.add('good')
        getUserPassword.parentElement.classList.add('good')
    }
    
    logUser()
})