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


async function get_json(url) {
  const file = await fetch(url);
  const json = await file.json();

  return json;
}


//จำนวน ผลงานที่แสดง
let works_data_amount = 4;

async function get_work_amount() {
  //ดึงข้อมูลจาก api
  get_json('/api/works.php?amount=' + works_data_amount).then((data) => {

    //ถ้าจำนวนผลงานเกิน 4งานแสดงปุ่มโหลดเพิ่มเติม
    if (data['count_all'] > 4) {
      document.getElementById('load_more_work').style.display = 'block';
    }
  }
  )
}

async function button_check(amount){
  //ปิดปุ่ม
  const data = await get_json('/api/works.php?amount=0');
  if (Number(data['count_all']) > works_data_amount) {
    if (amount != 0) {
      works_data_amount += amount;
      console.log(works_data_amount);
      get_works();
    }
  } else {
    document.getElementById('load_more_work').style.display = 'none';
  }
}

async function get_works() {
  //เพิ่มจำนวนข้อมูลที่ดึง
  var html = '';
  //ดึงข้อมูลจาก api
  const data = await get_json('/api/works.php?amount=' + works_data_amount);
  for (let i = 0; i < data['data'].length; i++) {

    html += '<div class="column is-half play-animation-down">';
    html += '<div class="card" style="height: 100%">';
    html += '<div class="card-image">';

    if (data['data'][i]['img'] != null) {
      html += '<figure class="image is-16by9">';
      html += '<img src="' + data['data'][i]['img'] + '" alt="Placeholder image">';
      html += '</figure>';
    } else {
      html += '<figure class="image is-16by9">';
      html += '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">';
      html += '</figure>';
    }

    html += '</div>';

    html += '<div class="card-content">';
    html += '<div class="media">';
    html += '<div class="media-left" style="width: 100%">';
    html += '<p style="font-size: 30px;color: #000000;font-family: ' + "Itim" + ';font-weight: lighter;">' + data['data'][i]['name'] + '</p>';
    html += '</div>';
    html += '</div>';

    html += '<div class="content" style="min-height:11rem;max-height: 14rem">';
    html += '<p class="is-size-5">' + data['data'][i]['content'] + '</p>';

    html += '<div class="columns is-mobile is-gapless" style="margin-top: 1rem;margin-bottom: 1rem">';
    if (data['data'][i]['tools'] != null) {
      var tools_data = JSON.parse(data['data'][i]['tools']);
      var color = ["dark", "primary", "link", "info", "success", "warning", "danger"];

      for (x in tools_data) {
        html += '<div class="column is-narrow">';
        html += '<span class="tag is-large is-' + color[x] + '"><i class="fa-brands fa-' + tools_data[x] + '" style="font-size: 30px"></i></span>';
        html += '</div>';
      }
      console.log(tools_data);
    } else {
      html += '<div class="column is-narrow">';
      html += '<span class="tag is-medium is-warning is-size-5">ไม่มีข้อมูล ของเครื่องมือที่ใช้พัฒนา</span>';
      html += '</div>';
    }
    html += '</div>';

    html += '</div>';
    html += '</div>';

    var more_data = JSON.parse(data['data'][i]['more']);
    html += '<footer class="card-footer">';
      
      if(more_data["github"] != null){
      html += '<a href="'+more_data["github"]+'" target="_blank" class="card-footer-item"><span class="icon-text" style="font-weight: bold;font-size: 18px">'+
      '<span class="icon">'+'<i class="fa-brands fa-github"></i>'+
      '</span>'+
      '<span>GITHUB</span>'+
      '</span>'+
      '</a>';
      }
      if (more_data["demo"] != null){
      html += '<a href="'+more_data["demo"]+'" target="_blank" class="card-footer-item"><span class="icon-text" style="font-weight: bold;font-size: 18px">'+
      '<span class="icon">'+'<i class="fa-solid fa-desktop"></i>'+
      '</span>'+
      '<span>DEMO</span>'+
      '</span>'+
      '</a>';
      }
      if (more_data["youtube"] != null){
      html += '<a href="'+more_data["youtube"]+'" target="_blank" class="card-footer-item"><span class="icon-text" style="font-weight: bold;font-size: 18px">'+
      '<span class="icon">'+'<i class="fa-brands fa-youtube"></i>'+
      '</span>'+
      '<span>GITHUB</span>'+
      '</span>'+
      '</a>';
      }
    html += '</footer>';

    html += '</div>';
    html += '</div>';

    //console.log(data['data'][i]['tools']);
  }
  //console.log(html);
  document.getElementById('work_data').innerHTML = html;

  if (Number(data['count_all']) <= works_data_amount) {
    document.getElementById('load_more_work').style.display = 'none';
  }
}



async function get_works_load() {
  //เพิ่มจำนวนข้อมูลที่ดึง
  var html = '';
  //ดึงข้อมูลจาก api
  const data = await get_json('/api/works.php?amount=' + works_data_amount);
  for (let i = 0; i < data['data'].length; i++) {

    html += '<div class="column is-half play-animation-down">';
    html += '<div class="card" style="height: 100%">';

    html += '<div class="card-image">';

      if (data['data'][i]['img'] != null) {
        html += '<figure class="image is-16by9">';
        html += '<img src="' + data['data'][i]['img'] + '" alt="Placeholder image">';
        html += '</figure>';
      } else {
        html += '<figure class="image is-16by9">';
        html += '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">';
        html += '</figure>';
      }

    html += '</div>';

    html += '<div class="card-content">';

    html += '<div class="media">';
    html += '<div class="media-left" style="width: 100%">';
    html += '<p style="font-size: 35px;color: #000000;font-family: ' + "Itim" + ';font-weight: lighter;">' + data['data'][i]['name'] + '</p>';
    html += '</div>';
    html += '</div>';

    html += '<div class="content" style="min-height:11rem;max-height: 14rem">';
    html += '<p class="is-size-5">' + data['data'][i]['content'] + '</p>';

      html += '<div class="columns is-mobile is-gapless" style="margin-top: 1rem;margin-bottom: 1rem">';
      if (data['data'][i]['tools'] != null) {
        var tools_data = JSON.parse(data['data'][i]['tools']);
        var color = ["dark", "primary", "link", "info", "success", "warning", "danger"];

        for (x in tools_data) {
          html += '<div class="column is-narrow">';
          html += '<span class="tag is-large is-' + color[x] + '"><i class="fa-brands fa-' + tools_data[x] + '" style="font-size: 30px"></i></span>';
          html += '</div>';
        }
        console.log(tools_data);
      } else {
        html += '<div class="column is-narrow">';
        html += '<span class="tag is-medium is-warning is-size-5">ไม่มีข้อมูล ของเครื่องมือที่ใช้พัฒนา</span>';
        html += '</div>';
      }
      html += '</div>';

    //ปิด content
    html += '</div>';


    //ปิด card-content
    html += '</div>';
    
    //footer card
    var more_data = JSON.parse(data['data'][i]['more']);
    html += '<footer class="card-footer">';
      
      if(more_data["github"] != null){
        html += '<a href="'+more_data["github"]+'" target="_blank" class="card-footer-item"><span class="icon-text" style="font-weight: bold;font-size: 18px">'+
        '<span class="icon">'+'<i class="fa-brands fa-github"></i>'+
        '</span>'+
        '<span>GITHUB</span>'+
        '</span>'+
        '</a>';
      }
      if (more_data["demo"] != null){
        html += '<a href="'+more_data["demo"]+'" target="_blank" class="card-footer-item"><span class="icon-text" style="font-weight: bold;font-size: 18px">'+
        '<span class="icon">'+'<i class="fa-solid fa-desktop"></i>'+
        '</span>'+
        '<span>DEMO</span>'+
        '</span>'+
        '</a>';
      }
      if (more_data["youtube"] != null){
        html += '<a href="'+more_data["youtube"]+'" target="_blank" class="card-footer-item"><span class="icon-text" style="font-weight: bold;font-size: 18px">'+
        '<span class="icon">'+'<i class="fa-brands fa-youtube"></i>'+
        '</span>'+
        '<span>GITHUB</span>'+
        '</span>'+
        '</a>';
      }
    html += '</footer>';

    //ปิด card
    html += '</div>';
    //ปิด column
    html += '</div>';

    //console.log(data['data'][i]['tools']);
  }
  //console.log(html);
  document.getElementById('work_data').innerHTML = html;
}


function click_toLayout(id){
  var elementTop = document.getElementById(id).getBoundingClientRect().top;
  
  document.body.scrollTop = elementTop;
  document.documentElement.scrollTop = elementTop;
}

document.getElementById("work_data").onload = get_works_load();