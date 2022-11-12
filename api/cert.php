<?php

$amount = $_GET["amount"];

//เช๋คว่ามีค่าเข้ามาหรือไม่
if($amount != null){

    $conn = new mysqli('127.0.0.1', 'root', '123');
    $result = $conn->query("SELECT * FROM certs LIMIT ".$amount);
    $data = $result->fetch_assoc();
    $conn->close();

    echo json_encode($data);
}

?>