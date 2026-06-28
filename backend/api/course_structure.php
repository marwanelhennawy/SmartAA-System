<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once __DIR__ . "/../db_connect.php";

$student_id = $_GET['student_id'] ?? null;

if (!$student_id) {
    echo json_encode([]);
    exit;
}

/* ======================
   GET STUDENT
====================== */
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

/* ======================
   COMPLETED COURSES
====================== */
$completed = [];

$stmt = $conn->prepare("
    SELECT sr.course_id
    FROM semester_result sr
    WHERE sr.student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$res = $stmt->get_result();

while ($row = $res->fetch_assoc()) {
    $completed[(int)$row['course_id']] = true;
}

/* ======================
   IN PROGRESS COURSES
====================== */
$inProgress = [];

$stmt = $conn->prepare("
    SELECT c.course_id
    FROM course_plan_courses pcc
    JOIN course_plan_submission cps
        ON pcc.submission_id = cps.submission_id
    JOIN course c
        ON pcc.course_code = c.course_code
    WHERE cps.student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$res = $stmt->get_result();

while ($row = $res->fetch_assoc()) {
    $inProgress[$row['course_id']] = true;
}

/* ======================
   MAIN STRUCTURE QUERY
====================== */
$sql = "
SELECT 
    ps.year_no,
    ps.semester_no,
    ps.course_id,
    c.course_code,
    c.course_name,
    COALESCE(c.credit, 3) AS credit
FROM programme_structure ps
JOIN course c ON ps.course_id = c.course_id
WHERE ps.intake_year = ?
AND ps.intake_month = ?
AND ps.programme = ?
ORDER BY ps.year_no, ps.semester_no, ps.structure_id
";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "iss",
    $student['intake_year'],
    $student['intake_month'],
    $student['programme']
);

$stmt->execute();
$res = $stmt->get_result();

/* ======================
   LOAD PREREQUISITES
====================== */
$prereqMap = [];

$prStmt = $conn->prepare("
    SELECT 
        cp.course_id,
        cp.rule_type,
        cp.min_credits,
        cp.min_cgpa,
        c2.course_code AS prerequisite_code
    FROM course_prerequisite cp
    LEFT JOIN course c2 ON cp.prerequisite_course_id = c2.course_id
");

$prStmt->execute();
$prRes = $prStmt->get_result();

while ($row = $prRes->fetch_assoc()) {

    $courseId = (int)$row['course_id'];

    // COURSE prerequisite
    if ($row['rule_type'] === "COURSE") {

        $code = strtoupper(trim($row['prerequisite_code'] ?? ''));

        if ($code !== '') {
            $prereqMap[$courseId]['courses'][] = $code;
        }
    }

    // CREDIT prerequisite
    if ($row['rule_type'] === "CREDIT") {
        $prereqMap[$courseId]['min_credits'] = (int)$row['min_credits'];
    }

    // CREDIT + CGPA prerequisite
    if ($row['rule_type'] === "CREDIT_CGPA") {
        $prereqMap[$courseId]['min_credits'] = (int)$row['min_credits'];
        $prereqMap[$courseId]['min_cgpa'] = (float)$row['min_cgpa'];
    }
}

/* ======================
   BUILD RESPONSE
====================== */
$structure = [];

while ($row = $res->fetch_assoc()) {

    $key = $row['year_no'] . "-" . $row['semester_no'];

    if (!isset($structure[$key])) {
        $structure[$key] = [
            "year" => (int)$row['year_no'],
            "semester" => (int)$row['semester_no'],
            "courses" => []
        ];
    }

    /* STATUS */
    $status = "not-taken";

    if (isset($completed[$row['course_id']])) {
        $status = "completed";
    } elseif (isset($inProgress[$row['course_id']])) {
        $status = "in-progress";
    }

    /* PUSH COURSE */
    $structure[$key]["courses"][] = [
        "course_id" => (int)$row['course_id'],
        "code" => $row['course_code'],
        "name" => $row['course_name'],
        "credits" => (int)$row['credit'],
        "status" => $status,

        /* PREREQUISITES (FIXED) */
        "prerequisites" => [
        "courses" => $prereqMap[$row['course_id']]['courses'] ?? [],
        "min_credits" => $prereqMap[$row['course_id']]['min_credits'] ?? null,
        "min_cgpa" => $prereqMap[$row['course_id']]['min_cgpa'] ?? null
    ]
    ];
}

echo json_encode(array_values($structure));