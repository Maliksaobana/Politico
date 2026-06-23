const toggleMenu = document.querySelector(".menu_btn");

toggleMenu.addEventListener("click", () => {
    document.querySelector('.menu_btn i:nth-child(1)').classList.toggle('show_menu')
    document.querySelector('.menu_btn i:nth-child(2)').classList.toggle('show_menu')
    document.querySelector('.sign_options').classList.toggle('open')
})