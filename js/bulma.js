const burgericon = document.querySelector('.navbar-burger');
const narbarmenu = document.querySelector('.navbar-menu');

burgericon.addEventListener('click', () => {
    narbarmenu.classList.toggle('is-active');
})