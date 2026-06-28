<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 0);
error_reporting(0);

session_start();
require_once __DIR__ . "/../db_connect.php";

/* =========================
   HANDLE PRECHECK
========================= */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* =========================
   CHECK DB
========================= */
if (!isset($conn)) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

/* =========================
   CHECK SESSION
========================= */
if (!isset($_SESSION['student_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "No active session"
    ]);
    exit;
}

$student_id = $_SESSION['student_id'];

/* =========================
   GET STUDENT
========================= */
$stmt = $conn->prepare("
    SELECT student_id, name, intake_year, intake_month, programme, cgpa, total_credits, email
    FROM student
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$student = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$student) {
    echo json_encode([
        "success" => false,
        "message" => "Student not found"
    ]);
    exit;
}

/* =========================
   GET SEMESTER RESULTS
========================= */
$stmt2 = $conn->prepare("
    SELECT 
        result_id,
        course_code,
        course_name,
        grade,
        status,
        MN,
        KR,
        JMN,
        semester,
        session,
        year_level
    FROM semester_result
    WHERE student_id = ?
    ORDER BY year_level ASC, semester ASC
");

$stmt2->bind_param("s", $student_id);
$stmt2->execute();
$result = $stmt2->get_result();

$results = [];
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}
$stmt2->close();

/* =========================
   CALCULATE CGPA + CREDITS
   (MASTER SOURCE OF TRUTH)
========================= */

$stmt3 = $conn->prepare("
    SELECT 
        IFNULL(SUM(KR), 0) AS total_credits,
        IFNULL(SUM(MN * KR) / NULLIF(SUM(KR), 0), 0) AS cgpa
    FROM semester_result
    WHERE student_id = ?
");

$stmt3->bind_param("s", $student_id);
$stmt3->execute();
$progressData = $stmt3->get_result()->fetch_assoc();
$stmt3->close();


$totalCredits = (float)$progressData['total_credits'];
$cgpa = (float)$progressData['cgpa'];

$requiredCredits = 127;
$remainingCredits = $requiredCredits - $totalCredits;
$progressPercentage = ($requiredCredits > 0)
    ? ($totalCredits / $requiredCredits) * 100
    : 0;

/* =========================
   FINAL RESPONSE
========================= */

echo json_encode([
    "success" => true,
    "student" => $student,
    "semester_results" => $results,
    "progress" => [
        "cgpa" => round($cgpa, 2),
        "total_credits" => $totalCredits,
        "required_credits" => $requiredCredits,
        "remaining_credits" => $remainingCredits,
        "progress_percentage" => round($progressPercentage, 2)
    ]
]);