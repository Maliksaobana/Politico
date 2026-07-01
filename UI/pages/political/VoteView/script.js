import { closeMenuBtn, openMenuBtn, openMenu ,openMenuBtnIcon, closeMenu, dashboardMenu, adminUser } from "../script.js";


openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)

const voteBtn = document.querySelector('.vote_btn'),
    petitionBtn = document.querySelector('.petition_btn')