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


async function get_json(url){
  const file = await fetch(url);
  const json = await file.json();

  return json;
}


//จำนวน ผลงานที่แสดง
let works_data_amount = 4;

function get_work_amount(){
  //ดึงข้อมูลจาก api
  get_json('/api/works.php?amount='+works_data_amount).then((data) => {
    
    //ถ้าจำนวนผลงานเกิน 4งานแสดงปุ่มโหลดเพิ่มเติม
    if(data['count_all'] > 1){
      document.getElementById('load_more_work').style.display = 'block';
    }
  }
  )

}
async function get_works(amount){
  //เพิ่มจำนวนข้อมูลที่ดึง
  var html = '';
  const amount_all_works = await get_json('/api/works.php?amount=0');
  if(Number(amount_all_works['count_all']) > works_data_amount){
    works_data_amount += amount;
    console.log(works_data_amount);
  }else{
    document.getElementById('load_more_work').style.display = 'none';
  }
  console.log(amount_all_works);
  //ดึงข้อมูลจาก api
  get_json('/api/works.php?amount='+works_data_amount).then((data) => {
    
    //loop ข้อมูล เพื่อแสดงผลบนเว็ปไซต์
    for(let i = 0; i < data['data'].length; i++){

      html += '<div class="column is-half play-animation-down">';
        html += '<div class="card" style="height: 100%">';
        html += '<div class="card-image">';

          if(data['data'][i]['img'] != null){
          html += '<figure class="image is-16by9">';
            html += '<img src="'+data['data'][i]['img']+'" alt="Placeholder image">';
          html += '</figure>';
          }else{
          html += '<figure class="image is-16by9">';
            html += '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">';
          html += '</figure>';
          }

        html += '</div>';

        html += '<div class="card-content">';
        html += '<div class="media">';
          html += '<div class="media-left" style="width: 100%">';
            html += '<p style="font-size: 35px;color: #000000;font-family: '+"Itim"+';font-weight: lighter;">'+data['data'][i]['name']+'</p>';
          html += '</div>';
        html += '</div>';

        html += '<div class="content">';
          html += '<p class="is-size-5">'+data['data'][i]['content']+'</p>';
          
          html += '<div class="columns is-mobile is-gapless" style="margin-top: 1rem;margin-bottom: 1rem">';
          if(data['data'][i]['tools'] != null){
            var tools_data = JSON.parse(data['data'][i]['tools']);
            var color = ["dark","primary","link","info","success","warning","danger"];

              for(x in tools_data){
                html += '<div class="column is-narrow">';
                html += '<span class="tag is-large is-'+color[x]+'"><i class="fa-brands fa-'+tools_data[x]+'" style="font-size: 30px"></i></span>';
                html += '</div>';
              }
            console.log(tools_data);
          }else{
            html += '<div class="column is-narrow">';
              html += '<span class="tag is-medium is-warning is-size-5">ไม่มีข้อมูล ของเครื่องมือที่ใช้พัฒนา</span>';
            html += '</div>';
          }
          html += '</div>';

        html += '</div>';
        html += '</div>';
        html += '</div>';
      html += '</div>';

      //console.log(data['data'][i]['tools']);
    }
    //console.log(html);
    document.getElementById('work_data').innerHTML += html;
  }
  )
}