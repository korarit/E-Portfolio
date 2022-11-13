

//scoll animation
function scoll_animation() {
  var reveals_down = document.querySelectorAll(".play-animation-down");
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

function copytoclipboard(text) {  
    // Select the text field  
     // Copy the text inside the text field
    navigator.clipboard.writeText(text);
  
    // Alert the copied text
    //alert("Copied the text: " + copyText.value);
}
  