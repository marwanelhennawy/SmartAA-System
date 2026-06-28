<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../db_connect.php";

$student_id = $_GET['student_id'] ?? '';
$search = $_GET['search'] ?? '';

if (!$student_id) {
    echo json_encode([]);
    exit;
}

/* COMPLETED COURSES */

$completed = [];

$stmt = $conn->prepare("
    SELECT course_code
    FROM semester_result
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();

$res = $stmt->get_result();

while ($row = $res->fetch_assoc()) {

    $code = strtoupper(trim($row['course_code']));
    $code = preg_replace('/\s+/', '', $code);

    $completed[$code] = true;
}

/* Get student programme */

$stmt = $conn->prepare("
    SELECT intake_year, intake_month, programme
    FROM student
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();

$student = $stmt->get_result()->fetch_assoc();

if (!$student) {
    echo json_encode([]);
    exit;
}

/* Search all courses in student's programme */

$sql = "
SELECT
    ps.course_id,
    ps.course_code,
    ps.year_no,
    ps.semester_no,
    c.course_name,
    c.credit
FROM programme_structure ps
LEFT JOIN course c ON ps.course_id = c.course_id
WHERE
    ps.intake_year = ?
    AND ps.intake_month = ?
    AND ps.programme = ?
    AND (
        ps.course_code LIKE ?
        OR c.course_name LIKE ?
    )
ORDER BY
    ps.year_no,
    ps.semester_no
";

$term = "%{$search}%";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "issss",
    $student['intake_year'],
    $student['intake_month'],
    $student['programme'],
    $term,
    $term
);

$stmt->execute();

$result = $stmt->get_result();

$courses = [];

while ($row = $result->fetch_assoc()) {

$code = strtoupper(trim($row['course_code'] ?? 'UNKNOWN'));
$code = preg_replace('/\s+/', '', $code);

$courses[] = [
    "course_id" => $row['course_id'] ?? 0,
    "code" => $code,
    "name" => $row['course_name'] ?? $row['course_code'],
    "credits" => isset($row['credit']) ? (int)$row['credit'] : 3,
    "year" => isset($row['year_no']) ? (int)$row['year_no'] : 0,
    "semester" => isset($row['semester_no']) ? (int)$row['semester_no'] : 0,
    "eligible" => true,
    "completed" => isset($completed[$code])
];
}

echo json_encode($courses);
exit;