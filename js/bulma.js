const burgericon = document.querySelector('.navbar-burger');
const narbarmenu = document.querySelector('.navbar-menu');

burgericon.addEventListener('click', () => {
    narbarmenu.classList.toggle('is-active');
})


function nav_sticky(){
    var navbar = document.getElementById("navbar");
  
    if (window.pageYOffset > 0) {
      navbar.classList.add("is-top")
    } else {
      navbar.classList.remove("is-top");
    }
  
}
window.addEventListener("scroll", nav_sticky);
