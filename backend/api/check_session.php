<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();

echo json_encode([
    "session_exists" => isset($_SESSION['student_id']),
    "student_id" => $_SESSION['student_id'] ?? null
]);