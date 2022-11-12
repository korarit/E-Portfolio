//scoll animation
function scoll_animation() {
    var reveals_right = document.querySelectorAll("#play-animation-right");
    var reveals_left = document.querySelectorAll("#play-animation-left");
    var reveals_down = document.querySelectorAll(".play-animation-down");
  
    //scoll down animation
    for (var i = 0; i < reveals_right.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals_right[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
       // reveals[i].classList.add("animatedFadeInUp");

       reveals_right[i].classList.add("fadeInRight");

      } else {
        reveals_right[i].classList.remove("fadeInRight");
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
          reveals_left[i].classList.remove("fadeInLeft");
        }
    }

    //down row animation
    for (var i = 0; i < reveals_down.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals_down[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
       // reveals[i].classList.add("animatedFadeInUp");

       reveals_down[i].classList.add("fadeInDown-row");

      } else {
        reveals_down[i].classList.remove("fadeInDown-row");
      }
    }
}
    
window.addEventListener("scroll", scoll_animation);