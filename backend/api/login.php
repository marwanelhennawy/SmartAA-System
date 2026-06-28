<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// IMPORTANT: handle preflight FIRST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

require_once __DIR__ . "/../db_connect.php";

// Read JSON input
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
error_log($raw);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON body"
    ]);
    exit;
}

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Find user
$sql = "SELECT * FROM student WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database error"
    ]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
    exit;
}

// Password check (plain text for now)
if ($password !== $user['password']) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid password"
    ]);
    exit;
}

// SESSION CREATED HERE
$_SESSION['student_id'] = $user['student_id'];

echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "student_id" => $user['student_id']
]);