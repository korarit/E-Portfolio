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
  
  
async function get_json(url) {
    const file = await fetch(url);
    const json = await file.json();
  
    return json;
}

//จำนวน กิจกรรมที่แสดง
let activities_data_amount = 6;

async function get_work_amount() {
  //ดึงข้อมูลจาก api
  get_json('/api/activitys.php?amount=' + activities_data_amount).then((data) => {

    //ถ้าจำนวนผลงานเกิน 4งานแสดงปุ่มโหลดเพิ่มเติม
    if (data['count_all'] > 6) {
      document.getElementById('load_more_work').style.display = 'block';
    }
  }
  )
}

async function button_check(amount){
    //ปิดปุ่ม
    const data = await get_json('/api/activitys.php?amount=0');
    if (Number(data['count_all']) > activities_data_amount) {
        if (amount != 0) {
            activities_data_amount += amount;
            console.log(activities_data_amount);
            get_activities();
        }
    } else {
        document.getElementById('load_more_activities').style.display = 'none';
    }
}

async function get_activities(){
    //html
    var html = '';
    const data = await get_json('/api/activitys.php?amount=' + activities_data_amount);

    for (let i = 0; i < data['data'].length; i++) {
        html += '<div class="column is-two-fifths">';
            html += '<div class="card" style="height: 100%">';
                html += '<div class="card-image">';

                    if(data['data'][i]["img"] != null){
                        var json = JSON.parse(data['data'][i]["img"]);

                        html += '<figure class="image is-16by9">';
                        html += '<img src="'+json[0]+'" alt="Placeholder image">';
                        html += '</figure>';
                    }else{
                        html += '<figure class="image is-16by9">';
                        html += '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">';
                        html += '</figure>';
                    }
                html += '</div>';
                html += '<div class="card-content">';

                    html += '<div class="media">';
                        html += '<div class="content">';
                        html += '<p class="title is-5" style="color: #000000">'+data["data"][i]["name"]+'</p>';
                        html += '<p class="subtitle is-6" style="color: #000000">'+data["data"][i]["address"]+'</p>';
                        html += '</div>';
                    html += '</div>';

                    html += '<div class="content">';
                    html += '<p class="is-size-5">'+data['data'][i]['content']+'</p>';
                    html += '<br>';
                    html += '</div>';
                html += '</div>';
            html += '</div>';
        html += '</div>';
    }
    document.getElementById('activities_data').innerHTML = html;

    if (Number(data['count_all']) <= activities_data_amount) {
        document.getElementById('load_more_activities').style.display = 'none';
    }
}

async function get_activities_load(){
    //html
    var html = '';
    const data = await get_json('/api/activitys.php?amount=6');

    for (let i = 0; i < data['data'].length; i++) {
        html += '<div class="column is-two-fifths">';
            html += '<div class="card" style="height: 100%">';
                html += '<div class="card-image">';

                    if(data['data'][i]["img"] != null){
                        var json = JSON.parse(data['data'][i]["img"]);

                        html += '<figure class="image is-16by9">';
                        html += '<img src="'+json[0]+'" alt="Placeholder image">';
                        html += '</figure>';
                    }else{
                        html += '<figure class="image is-16by9">';
                        html += '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">';
                        html += '</figure>';
                    }
                html += '</div>';
                html += '<div class="card-content">';

                    html += '<div class="media">';
                        html += '<div class="content">';
                        html += '<p class="title is-5" style="color: #000000">'+data["data"][i]["name"]+'</p>';
                        html += '<p class="subtitle is-6" style="color: #000000">'+data["data"][i]["address"]+'</p>';
                        html += '</div>';
                    html += '</div>';

                    html += '<div class="content">';
                    html += '<p class="is-size-5">'+data['data'][i]['content']+'</p>';
                    html += '<br>';
                    html += '</div>';
                html += '</div>';
            html += '</div>';
        html += '</div>';
    }
    document.getElementById('activities_data').innerHTML = html;
}
document.getElementById("activities_data").onload = get_activities_load();