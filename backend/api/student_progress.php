<?php
header("Content-Type: application/json");
require_once "../db_connect.php";

$student_id = $_GET['student_id'] ?? null;

if (!$student_id) {
    echo json_encode([
        "success" => false,
        "message" => "Missing student_id"
    ]);
    exit;
}

/* ======================
   CGPA + CREDITS
====================== */

$stmt = $conn->prepare("
    SELECT 
        IFNULL(SUM(KR), 0) AS total_credits,
        IFNULL(SUM(MN * KR) / NULLIF(SUM(KR), 0), 0) AS cgpa
    FROM semester_result
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$data = $stmt->get_result()->fetch_assoc();

$total = (float)$data['total_credits'];
$cgpa = (float)$data['cgpa'];

$required = 127;
$remaining = $required - $total;
$percentage = ($required > 0) ? ($total / $required) * 100 : 0;

echo json_encode([
    "success" => true,
    "total_credits" => $total,
    "cgpa" => round($cgpa, 2),
    "required_credits" => $required,
    "remaining_credits" => $remaining,
    "progress_percentage" => round($percentage, 2)
]);