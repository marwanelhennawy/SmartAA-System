<?php
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../db_connect.php";

$student_id = $_GET['student_id'] ?? null;

if (!$student_id) {
    echo json_encode([]);
    exit;
}

/* =========================
   1. GET STUDENT INFO
========================= */

$stmt = $conn->prepare("
    SELECT student_id, intake_year, intake_month, programme
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

/* =========================
   2. GET ALL RESULTS
   (USED FOR REAL SEMESTER CALCULATION)
========================= */
$stmt = $conn->prepare("
    SELECT semester, year_level, course_code, KR, JMN
    FROM semester_result
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$res = $stmt->get_result();

$totalCredits = 0;
$totalPoints = 0;

$stmt = $conn->prepare("
    SELECT KR, MN
    FROM semester_result
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$res = $stmt->get_result();

while ($row = $res->fetch_assoc()) {
    $totalCredits += (float)$row['KR'];
    $totalPoints  += (float)$row['MN'];
}

$cgpa = $totalCredits > 0 ? ($totalPoints / $totalCredits) : 0;

$stmt->close();

// =========================
// STEP 2.5: COMPLETED COURSES MAP
// =========================

$completedCourses = [];

$stmt = $conn->prepare("
    SELECT DISTINCT course_code
    FROM semester_result
    WHERE student_id = ?
");

$stmt->bind_param("s", $student_id);
$stmt->execute();
$res = $stmt->get_result();

while ($row = $res->fetch_assoc()) {
    $code = strtoupper(trim($row['course_code']));
    $code = preg_replace('/\s+/', '', $code);

    $completedCourses[$code] = true;
}

// =========================
// STEP 3: FIND NEXT SEMESTER PROPERLY
// =========================

// get all semesters ordered
$stmt = $conn->prepare("
    SELECT DISTINCT year_no, semester_no
    FROM programme_structure
    WHERE intake_year = ?
    AND intake_month = ?
    AND programme = ?
    ORDER BY year_no, semester_no
");

$stmt->bind_param(
    "iss",
    $student['intake_year'],
    $student['intake_month'],
    $student['programme']
);

$stmt->execute();
$res = $stmt->get_result();

$allSemesters = [];

while ($row = $res->fetch_assoc()) {
    $allSemesters[] = [
        "year" => (int)$row['year_no'],
        "sem" => (int)$row['semester_no']
    ];
}

// find highest completed semester
$lastCompletedIndex = -1;

foreach ($allSemesters as $index => $sem) {
    $year = $sem['year'];
    $semNo = $sem['sem'];

    $check = $conn->prepare("
    SELECT COUNT(DISTINCT ps.course_code) as total
    FROM programme_structure ps
    JOIN course c ON ps.course_id = c.course_id
    JOIN semester_result sr
      ON REPLACE(UPPER(sr.course_code), ' ', '') =
         REPLACE(UPPER(ps.course_code), ' ', '')
     AND sr.student_id = ?
    WHERE ps.year_no = ?
      AND ps.semester_no = ?
      AND ps.intake_year = ?
      AND ps.intake_month = ?
      AND ps.programme = ?
      AND c.course_type = 'core'
");

    $check->bind_param(
        "siisss",
        $student_id,
        $year,
        $semNo,
        $student['intake_year'],
        $student['intake_month'],
        $student['programme']
    );

    $check->execute();
    $r = $check->get_result()->fetch_assoc();

    // total courses in semester
    $totalCheck = $conn->query("
    SELECT COUNT(*) as total
    FROM programme_structure ps
    JOIN course c ON ps.course_id = c.course_id
    WHERE ps.year_no = $year
    AND ps.semester_no = $semNo
    AND ps.intake_year = {$student['intake_year']}
    AND ps.intake_month = '{$student['intake_month']}'
    AND ps.programme = '{$student['programme']}'
    AND c.course_type = 'core'
")->fetch_assoc();

    $totalCourses = (int)$totalCheck['total'];
    $completedCount = (int)$r['total'];

    // ONLY CLOSE LOOP AFTER THIS LOGIC
    if ($totalCourses > 0 && $completedCount >= $totalCourses) {
        $lastCompletedIndex = $index;
    }
}

// next semester = after last completed
if ($lastCompletedIndex + 1 < count($allSemesters)) {
    $next = $allSemesters[$lastCompletedIndex + 1];
} else {
    $next = $allSemesters[$lastCompletedIndex]; // stay at last semester
}

$nextYear = $next['year'];
$nextSem = $next['sem'];

/* =========================
   3. LOAD PROGRAMME STRUCTURE
========================= */

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
WHERE ps.intake_year = ?
AND ps.intake_month = ?
AND ps.programme = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "iss",
    $student['intake_year'],
    $student['intake_month'],
    $student['programme']
);

$stmt->execute();
$result = $stmt->get_result();

/* =========================
   4. PREREQUISITES
========================= */

$prereqMap = [];
$creditRuleMap = [];
$cgpaRuleMap = [];


$pr = $conn->query("
    SELECT 
        c.course_code AS course,
        pc.course_code AS prerequisite,
        cp.min_credits,
        cp.min_cgpa,
        cp.rule_type
    FROM course_prerequisite cp
    JOIN course c ON cp.course_id = c.course_id
    LEFT JOIN course pc ON cp.prerequisite_course_id = pc.course_id
");

while ($row = $pr->fetch_assoc()) {

    $course = strtoupper(trim($row['course']));
    $course = preg_replace('/\s+/', '', $course);

    $pre = strtoupper(trim($row['prerequisite'] ?? ''));
    $pre = preg_replace('/\s+/', '', $pre);

    $ruleType = $row['rule_type'];

    // COURSE prerequisite
    if ($ruleType === "COURSE") {
        $prereqMap[$course][] = $pre;
    }

    // CREDIT requirement (Industrial Training)
    if ($ruleType === "CREDIT") {
        $creditRuleMap[$course] = (int)$row['min_credits'];
    }

    // CREDIT + CGPA requirement
    if ($ruleType === "CREDIT_CGPA") {
        $creditRuleMap[$course] = (int)$row['min_credits'];
        $cgpaRuleMap[$course] = (float)$row['min_cgpa'];
    }
}
error_log(json_encode($prereqMap));

/* =========================
   5. BUILD AVAILABLE COURSES
========================= */

$available = [];

while ($row = $result->fetch_assoc()) {

    $year = (int)$row['year_no'];
    $sem = (int)$row['semester_no'];

    // ONLY SHOW NEXT SEMESTER
   if (!(
    (int)$year === (int)$nextYear &&
    (int)$sem === (int)$nextSem
    )) {
    continue;
    }

    // skip completed
    $code = strtoupper(trim($row['course_code']));
    $code = preg_replace('/\s+/', '', $code);

    if (isset($completedCourses[$code])) {
        continue;
    }

    $eligible = true;
    $missing = [];

    if (!empty($prereqMap[$code])) {
        foreach ($prereqMap[$code] as $pre) {
            $pre = strtoupper(trim($pre));
            $pre = preg_replace('/\s+/', '', $pre);

    if (!isset($completedCourses[$pre])) {
                $eligible = false;
                $missing[] = $pre;
            }
        }
    }

    if (isset($creditRuleMap[$code])) {
        if ($totalCredits < $creditRuleMap[$code]) {
            $eligible = false;
            $missing[] = "MIN_CREDITS_" . $creditRuleMap[$code];
        }
    }

    if (isset($cgpaRuleMap[$code])) {
        if ($cgpa < $cgpaRuleMap[$code]) {
            $eligible = false;
            $missing[] = "MIN_CGPA_" . $cgpaRuleMap[$code];
        }
    }
    

    $available[] = [
        "course_id" => $row['course_id'],
        "code" => $code,
        "name" => $row['course_name'] ?? "Unknown",
        "credits" => (int)($row['credit'] ?? 0),
        "eligible" => $eligible,
        "completed" => isset($completedCourses[$code]),
        "missing_prerequisites" => $missing,
        "semester" => (int)$row['semester_no'],
        "year" => (int)$row['year_no']
    ];

}

error_log("NEXT SEMESTER: Year $nextYear Sem $nextSem");

echo json_encode($available);