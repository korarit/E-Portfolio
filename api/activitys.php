<?php
include('config.php');
//เช๋คว่ามีค่าเข้ามาหรือไม่
if(isset($_GET["amount"])){
    $amount = $_GET["amount"];

    if($amount != 0){
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');

        $get_count = $conn->query("SELECT * FROM activitys");
        $count_all = $get_count->num_rows;

        $result = $conn->query("SELECT * FROM activitys LIMIT ".$amount);
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $conn->close();

        if(count($data) != 0){
            $json = array("count_all" => $count_all, "data" => $data);
            echo json_encode($json, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }else{
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }
    }else{
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');
        $result = $conn->query("SELECT * FROM activitys");
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $conn->close();

        if(count($data) != 0){
            $json = array("count_all" => count($data), "data" => $data);
            echo json_encode($json, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }else{
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }
    }
}elseif(isset($_GET["get_img"])){
    $id = $_GET["get_img"];
    if($id != 0){
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');

        $get_count = $conn->query("SELECT * FROM activitys WHERE id= '".$id."'");
        $count_all = $get_count->num_rows;

        $result = $conn->query("SELECT img FROM activitys WHERE id= '".$id."'");
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $conn->close();

        if(count($data) != 0){
            $json = array("count_all" => $count_all, "data" => $data);
            echo json_encode($json, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }else{
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }
    }
}else{
    $code = array("status" => "404", "reason" => "ไม่ได้กำหนดจำนวนข้อมูลที่ต้องการดึง");
    echo json_encode($code, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
?>