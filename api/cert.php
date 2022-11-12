<?php
//เช๋คว่ามีค่าเข้ามาหรือไม่
if(isset($_GET["amount"])){
    $amount = $_GET["amount"];


    $conn = new mysqli('127.0.0.1', 'root', '123');
    $result = $conn->query("SELECT * FROM certs LIMIT ".$amount);
    $data = $result->fetch_assoc();
    $conn->close();

    if(count($data) != 0){
        echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }else{
        $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
        echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
}else{
    $code = array("status" => "400", "reason" => "ไม่ได้กำหนดจำนวนข้อมูลที่ต้องการดึง");
    echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}

?>