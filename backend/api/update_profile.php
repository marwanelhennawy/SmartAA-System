<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();
require_once __DIR__ . "/../db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($_SESSION['student_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$student_id = $_SESSION['student_id'];

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$campus = $data['campus'] ?? '';

$stmt = $conn->prepare("
    UPDATE student
    SET name=?, email=?, phone=?, campus=?
    WHERE student_id=?
");

$stmt->bind_param("sssss", $name, $email, $phone, $campus, $student_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profile updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}
?>