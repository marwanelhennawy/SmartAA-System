<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
require_once __DIR__ . "/../db_connect.php";

if (!isset($_SESSION['student_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$student_id = $_SESSION['student_id'];

/* GET STUDENT */
$stmt = $conn->prepare("SELECT * FROM student WHERE student_id = ?");
$stmt->bind_param("s", $student_id);
$stmt->execute();
$student = $stmt->get_result()->fetch_assoc();

/* LIVE CGPA + CREDITS (computed from semester_result, not stored column) */
$stmt3 = $conn->prepare("SELECT KR, JMN FROM semester_result WHERE student_id = ?");
$stmt3->bind_param("s", $student_id);
$stmt3->execute();
$res3 = $stmt3->get_result();

$totalCredits = 0;
$totalPoints = 0;

while ($row = $res3->fetch_assoc()) {
    $totalCredits += (float)$row['KR'];
    $totalPoints  += (float)$row['JMN'];
}

$student['total_credits'] = $totalCredits;
$student['cgpa'] = $totalCredits > 0 ? round($totalPoints / $totalCredits, 2) : 0;

/* GET UPLOAD HISTORY */

/* GET UPLOAD HISTORY */
$stmt2 = $conn->prepare("
    SELECT upload_id, semester, session, upload_date, file_name, file_path
    FROM result_upload
    WHERE student_id = ?
    ORDER BY upload_date DESC
");

$stmt2->bind_param("s", $student_id);
$stmt2->execute();
$uploads = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "student" => $student,
    "uploads" => $uploads
]);
?>