import { base_url,url_endpoints } from "../base.js"


const {password:forgetPasswordUrl} = url_endpoints.user

const token = JSON.parse(localStorage.getItem('token'))

console.log(token)



const confirmNewPassword = document.querySelector(".confirm"),
    createNewPassword = document.querySelector("[type=password]"),
    wrapper = document.querySelector('.forget_wrapper')

const confirmPasswordBtn = document.querySelector(".confirm_btn")

const editUserPassword = async () => {
    const body = {
        password: confirmNewPassword.value
    }

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
            return `${confirmChangeOfPassword.status}: ${confirmChangeOfPassword.json}`
        }

        const data = await confirmChangeOfPassword.json()

        console.log(data)
    } catch (e) {
        console.error(e.message)
    }
}


confirmPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const errModal = document.createElement('div')
    errModal.classList.add('errModal')
    

    if(createNewPassword.value.trim() === '' || createNewPassword.value.length < 3) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Create new password and must not be less than 3</h1> n\
            <span></span>'
        wrapper.append(errModal)
        createNewPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            createNewPassword.parentElement.classList.remove('err')
        },5000)

        return

    }else if (createNewPassword.value !== confirmNewPassword.value) {
        errModal.classList.add('show')
        errModal.innerHTML = '<h1>Password not the same</h1> n\
            <span></span>'
        wrapper.append(errModal)
        createNewPassword.parentElement.classList.add('err')
        confirmNewPassword.parentElement.classList.add('err')

        setTimeout(()=> {
            errModal.remove()
            createNewPassword.parentElement.classList.remove('err')
            confirmNewPassword.parentElement.classList.remove('err')
        },5000)

        return
    }else {
        createNewPassword.parentElement.classList.add('good')
        confirmNewPassword.parentElement.classList.add('good')
    }
    
    editUserPassword()
})

