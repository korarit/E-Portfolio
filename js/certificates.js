async function get_json(url) {
    const file = await fetch(url);
    const json = await file.json();
  
    return json;
}


//จำนวน เกียรติบัตรที่แสดง
let certificate_data_amount = 10;

async function get_activities_amount() {
  //ดึงข้อมูลจาก api
  get_json('/api/cert.php?amount=1').then((data) => {

    //ถ้าจำนวนผลงานเกิน 6งานแสดงปุ่มโหลดเพิ่มเติม
    if (data['count_all'] > 10) {
      document.getElementById('load_more_certificate').style.display = 'block';
    }
  }
  )
}

async function button_check(amount){
    //ปิดปุ่ม
    const data = await get_json('/api/cert.php?amount=1');
    if (Number(data['count_all']) > certificate_data_amount) {
        if (amount != 0) {
            certificate_data_amount += amount;
            console.log(certificate_data_amount);
            get_activities();
        }
    } else {
        document.getElementById('load_more_certificate').style.display = 'none';
    }
}

async function get_activities(){
    //html
    var html = '';
    const data = await get_json('/api/cert.php?amount=' + certificate_data_amount);

    for (let i = 0; i < data['data'].length; i++) {
        html += '<div class="column is-two-fifths">';
            html += '<div class="card" style="height: 100%">';
                html += '<div class="card-image">';

                    if(data['data'][i]["img"] != null){
                        var img = JSON.parse(data['data'][i]["img"]);

                        html += '<figure class="image is-16by9">';
                        html += '<img onclick="gallery('+"'"+data['data'][i]["id"]+"'"+')" src="'+img[0]+'">';
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
                        html += '<p style="font-size: 30px;color: #000000;font-family: ' + "Itim" + ';font-weight: lighter;">'+data["data"][i]["name"]+'</p>';
                        html += '<p style="font-size: 20px;color: #000000;font-family: ' + "Itim" + ';font-weight: lighter;">'+data["data"][i]["institution"]+'</p>';
                        html += '</div>';
                    html += '</div>';

                    html += '<div class="content">';
                    html += '<p class="is-size-5">'+data['data'][i]['content']+'</p>';
                    html += '</div>';
                html += '</div>';
            html += '</div>';
        html += '</div>';
    }
    document.getElementById('cert_data').innerHTML = html;

    if (Number(data['count_all']) <= certificate_data_amount) {
        document.getElementById('load_more_certificate').style.display = 'none';
    }
}

//แสดงเกียรติบัตรตอน load หน้า
async function get_activities_load(){
    //html
    var html = '';
    const data = await get_json('/api/cert.php?amount=10');

    for (let i = 0; i < data['data'].length; i++) {
        html += '<div class="column is-two-fifths">';
            html += '<div class="card" style="height: 100%">';
                html += '<div class="card-image">';

                    if(data['data'][i]["img"] != null){
                        var json = JSON.parse(data['data'][i]["img"]);

                        html += '<figure class="image is-16by9">';
                        html += '<img onclick="gallery('+"'"+data['data'][i]['id']+"'"+')" src="'+json[0]+'" >';
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
                        html += '<p style="font-size: 30px;color: #000000;font-family: ' + "Itim" + ';font-weight: lighter;">'+data["data"][i]["name"]+'</p>';
                        html += '<p style="font-size: 20px;color: #000000;font-family: ' + "Itim" + ';font-weight: lighter;">'+data["data"][i]["institution"]+'</p>';
                        html += '</div>';
                    html += '</div>';

                    html += '<div class="content">';
                    html += '<p class="is-size-5">'+data['data'][i]['content']+'</p>';
                    html += '</div>';
                html += '</div>';
            html += '</div>';
        html += '</div>';
    }
    document.getElementById('cert_data').innerHTML = html;
}
document.getElementById("cert_data").onload = get_activities_load();

function cert_zoom (img){
    //ใส่รูป
    document.getElementById("image-zoom").src = img;

    //เปิด modal zoom
    document.getElementById("certificate-zoom").classList.add("is-active");
}

function close_zoom (){
    document.getElementById("certificate-zoom").classList.remove("is-active");
}

async function gallery (id){
    const img_list = await get_json('/api/cert.php?cert_id=' + id);
  
    var data = JSON.parse(img_list['data']['img']);
    var html = '';
    for (let i = 0; i < data.length; i++) {
      html += '<div class="column image-column">'+
      '<img src="'+data[i]+'" onclick="change_img(this)">'+
      '</div>';
    }
    //สร้างรายการรูป
    document.getElementById("gallery_list").innerHTML = html;
  
    //ใส่รูป
    document.getElementById("image-gallery").src = data[0];
  
    //เปิด modal zoom
    document.getElementById("gallery-modal").classList.add("is-active");
}
function change_img (img){
    document.getElementById("image-gallery").src = img.src;
}
function close_zoom (){
    document.getElementById("gallery-modal").classList.remove("is-active");
}