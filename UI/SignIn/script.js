import { base_url, url_endpoints } from "../base.js"


const { signIn:signInAuth } = url_endpoints.user


const getUserEmail = document.querySelector("[type=email]"),
    getUserPassword = document.querySelector("[type=password]"),
    wrapper = document.querySelector('.signin_wrapper')

const logInBtn = document.querySelector(".log_in")

const logUser = async () => {
    const body = {
        email: getUserEmail.value,
        password: getUserPassword.value
    }


    try {
        const logInUser = await fetch(`${base_url}${signInAuth}`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!logInUser.ok) {
            throw new Error(`${logInUser.status}: unable to login user, try agin`)
        }

        const data = await logInUser.json()

        const getToken = localStorage.setItem('token',JSON.stringify(data.body.token))

        console.log(data)
    } catch (e) {
        console.error(e.message)
    }


    // if(dummyLogin && role === 'politician') {
    //     window.location.pathname = "/UI/pages/political/index.html"
    //     console.log('logged in')
    // }else {
    //     window.location.pathname = "/UI/pages/clients/index.html"
    // }


}


logInBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const errModal = document.createElement('div')
    errModal.classList.add('errModal')
    

    if(getUserEmail.value.trim() === '' && getUserPassword.value.trim() === '') {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Fields must not be empty!!</h1> n\
            <span></span>'
        wrapper.append(errModal)
        getUserEmail.parentElement.classList.add('err')
        getUserPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            getUserEmail.parentElement.classList.remove('err')
            getUserPassword.parentElement.classList.remove('err')
        },5000)

        return

    }else if (!getUserEmail.value.includes('@')) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Email must include @ </h1> n\
            <span></span>'
        wrapper.append(errModal)
        getUserEmail.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            getUserEmail.parentElement.classList.remove('err')
        },5000)

        return
    }else if (getUserPassword.value.trim() === '' || getUserPassword.value.length < 3) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Password must be greater than 3</h1> n\
            <span></span>'
        wrapper.append(errModal)
        getUserPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            getUserPassword.parentElement.classList.remove('err')
        },5000)

        return
    }else {
        getUserEmail.parentElement.classList.add('good')
        getUserPassword.parentElement.classList.add('good')
    }
    
    logUser()
})