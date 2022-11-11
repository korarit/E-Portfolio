let slideIndex_desktop = 1;
let slideIndex_mobile = 1;

let activityIndex_desktop = 1;
let activityIndex_mobile = 1;

showSlides_desktop(slideIndex_desktop);
showSlides_mobile(slideIndex_mobile);

activity_desktop(activityIndex_desktop);
activity_mobile(activityIndex_mobile);

// Next/previous controls
function plusSlides_desktop(n) {
  showSlides_desktop(slideIndex_desktop += n);
}
function plusSlides_mobile(n) {
  showSlides_mobile(slideIndex_mobile += n);
}

function plusactivity_desktop(n) {
  activity_desktop(activityIndex_desktop += n);
}
function plusactivity_mobile(n) {
  activity_mobile(activityIndex_mobile += n);
}


function showSlides_desktop(n) {
  let i;
  let slides = document.getElementsByClassName("programming-d");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex_desktop = 1}
  if (n < 1) {slideIndex_desktop = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex_desktop-1].style.display = "block";
}

function showSlides_mobile(n) {
  let i;
  let slides = document.getElementsByClassName("programming-m");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex_mobile = 1}
  if (n < 1) {slideIndex_mobile = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex_mobile-1].style.display = "block";
}

function activity_desktop(n) {
  let i;
  let slides = document.getElementsByClassName("activity-d");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {activityIndex_desktop = 1}
  if (n < 1) {activityIndex_desktop = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[activityIndex_desktop-1].style.display = "block";
}

function activity_mobile(n) {
  let i;
  let slides = document.getElementsByClassName("activity-m");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {activityIndex_mobile = 1}
  if (n < 1) {activityIndex_mobile = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[activityIndex_mobile-1].style.display = "block";
}