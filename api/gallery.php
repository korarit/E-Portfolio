<?php
include('config.php');
//เช๋คว่ามีค่าเข้ามาหรือไม่
if (isset($_GET["id"])) {
    $id = $_GET["id"];

    if ($id != 0) {

        //ดึงตามความต้องการ
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');

        $get_count = $conn->query("SELECT id FROM gallery ");
        $count_all = $get_count->num_rows;

        $result = $conn->query("SELECT data FROM gallery WHERE id = " . $id);
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $conn->close();

        if (count($data) != 0) {
            $json = array("count_all" => $count_all, "data" => $data[0]['data']);
            echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } else {
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
    } else {
        //ดึงข้อมูลทั้งหมด
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');
        $result = $conn->query("SELECT data FROM gallery");
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $conn->close();

        if (count($data) != 0) {
            $json = array("count_all" => count($data), "data" => $data);
            echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } else {
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
    }
} elseif (isset($_GET["page"])) {
    $page = $_GET["page"];

    if ($page != 0) {

        //ดึงตามความต้องการ
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');

        $get_count = $conn->query("SELECT id FROM gallery ");
        $count_all = $get_count->num_rows;

        $result = $conn->query("SELECT data FROM gallery WHERE pages = '" . $page."'");
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $conn->close();

        if (count($data) != 0) {
            $json = array("count_all" => $count_all, "data" => $data[0]['data']);
            echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } else {
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
    } else {
        //ดึงข้อมูลทั้งหมด
        $conn = new mysqli($database_host, $database_user, $database_password, 'portfoliov2');
        $result = $conn->query("SELECT data FROM gallery");
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $conn->close();

        if (count($data) != 0) {
            $json = array("count_all" => count($data), "data" => $data);
            echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } else {
            $code = array(["status" => "404", "reason" => "ไม่มีข้อมูล"]);
            echo json_encode($code, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
    }
} else {
    $code = array("status" => "404", "reason" => "ไม่ได้กำหนดจำนวนข้อมูลที่ต้องการดึง");
    echo json_encode($code, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
