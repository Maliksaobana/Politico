// api end point

import { base_url, url_endpoints } from "../base.js"


const { signup:signUpAuth } = url_endpoints.user


const signUpBtn = document.querySelector(".sign_up"),
    wrapper = document.querySelector('.signup_wrapper'),
    postUserConfirmedPassword = document.querySelector('.confirm'),
    postUserPassword = document.querySelector('[type=password]'),
    postUserEmail = document.querySelector('[type=email]'),
    postUserName = document.querySelector('[type=text]'),
    postAdminToken = document.querySelector('.admin_token')


const signInUser = async () => {
    const body = {
        name: postUserName.value,
        email: postUserEmail.value,
        password: postUserConfirmedPassword.value,
        token: postAdminToken.value,
    }

    
    try {
        const responce = await fetch(`${base_url}${signUpAuth}`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })

        if(!responce.ok) {
            throw new Error(`${responce.status}: unable to register user try agin`)

            return
        }

        const data = await responce.json()

        const setToken = localStorage.setItem('token',JSON.stringify(data.body.token))



    } catch (e) {
        console.error(e.message)
    }


    // if(dummyLogin) {
    //     window.location.pathname = "/UI/pages/clients/index.html"
    //     console.log('logged in')
    // }

}


signUpBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const errModal = document.createElement('div')
    errModal.classList.add('errModal')
    

    if(postUserEmail.value.trim() === '' && postUserPassword.value.trim() === '' && postUserName.value.trim() === '') {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Fields must not be empty!!</h1> n\
            <span></span>'
        wrapper.append(errModal)
        postUserEmail.parentElement.classList.add('err')
        postUserName.parentElement.classList.add('err')
        postUserPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            postUserEmail.parentElement.classList.remove('err')
            postUserName.parentElement.classList.remove('err')
            postUserPassword.parentElement.classList.remove('err')
        },5000)

        return

    }else if (!postUserEmail.value.includes('@')) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Email must include @ </h1> n\
            <span></span>'
        wrapper.append(errModal)
        postUserEmail.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            postUserEmail.parentElement.classList.remove('err')
        },5000)

        return
    }else if (postUserPassword.value.trim() === '' || postUserPassword.value.length < 3) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Password must be greater than 3</h1> n\
            <span></span>'
        wrapper.append(errModal)
        postUserPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            postUserPassword.parentElement.classList.remove('err')
        },5000)

        return
    }else if (postUserPassword.value !== postUserConfirmedPassword.value) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Password not the same</h1> n\
            <span></span>'
        wrapper.append(errModal)
        postUserPassword.parentElement.classList.add('err')
        postUserConfirmedPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            postUserPassword.parentElement.classList.remove('err')
            postUserConfirmedPassword.parentElement.classList.remove('err')
        },5000)

        return
    }else {
        postUserEmail.parentElement.classList.add('good')
        postUserPassword.parentElement.classList.add('good')
        postUserName.parentElement.classList.add('good')
        postUserConfirmedPassword.parentElement.classList.add('good')
    }
    
    signInUser()
})