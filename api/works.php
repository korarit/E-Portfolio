<?php
include('config.php');
//เช๋คว่ามีค่าเข้ามาหรือไม่
if(isset($_GET["amount"])){
    $amount = $_GET["amount"];

    $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');
    $result = $conn->query("SELECT * FROM works LIMIT ".$amount);
    $data = $result->fetch_all(MYSQLI_ASSOC);

    $conn->close();

    if(count($data) != 0){
        echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }else{
        $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
        echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
}else{
    $code = array("status" => "404", "reason" => "ไม่ได้กำหนดจำนวนข้อมูลที่ต้องการดึง");
    echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}

?>