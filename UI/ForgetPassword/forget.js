const confirmNewPassword = document.querySelector(".confirm"),
    createNewPassword = document.querySelector("[type=password]"),
    wrapper = document.querySelector('.forget_wrapper')

const confirmPasswordBtn = document.querySelector(".confirm_btn")

const editUserPassword = async () => {
    let dummyLogin = true
    const role = 'politician'

    console.log('logged......')


    if(dummyLogin) {
        window.location.pathname = "/UI/SignIn/signin.html"
        console.log('logged in')
    }

    console.log('not logged in')
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

