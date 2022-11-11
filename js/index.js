//scoll animation
function scoll_animation() {
    var reveals_right = document.querySelectorAll("#play-animation-right");
    var reveals_left = document.querySelectorAll("#play-animation-left");
  
    //scoll down animation
    for (var i = 0; i < reveals_right.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals_right[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
       // reveals[i].classList.add("animatedFadeInUp");

       reveals_right[i].classList.add("fadeInRight");

      } else {
        //reveals[i].classList.remove("animatedFadeInUp");
      }
    }
    for (var i = 0; i < reveals_left.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals_left[i].getBoundingClientRect().top;
        var elementVisible = 150;
    
        if (elementTop < windowHeight - elementVisible) {
         // reveals[i].classList.add("animatedFadeInUp");

         reveals_left[i].classList.add("fadeInLeft");
  
        } else {
          //reveals[i].classList.remove("animatedFadeInUp");
        }
      }
}
    
window.addEventListener("scroll", scoll_animation);