export const closeMenuBtn = document.querySelector('.menu_close'),
    openMenuBtn = document.querySelector('.menu'),
    openMenuBtnIcon = document.querySelector('.menu i'),
    adminUser = document.querySelector('.only_admin'),
    dashboardMenu = document.querySelector('.dashboard_menu');


export const closeMenu = () => {
    setTimeout(()=>{
        dashboardMenu.classList.toggle('open')
        openMenuBtn.classList.toggle('closeTab')
        openMenuBtnIcon.classList.toggle('close')
    },200)
    closeMenuBtn.classList.toggle('close')
}

export const openMenu = () => {
    dashboardMenu.classList.toggle('open')
    openMenuBtnIcon.classList.toggle('close')
    setTimeout(()=>{
        openMenuBtn.classList.toggle('closeTab')
    },100)
    closeMenuBtn.classList.remove('close')
}

closeMenuBtn.addEventListener('click', closeMenu)

openMenuBtn.addEventListener('click', openMenu)