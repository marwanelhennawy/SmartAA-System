<?php
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../db_connect.php";

/**
 * Get completed course codes
 */
function getCompletedCourseCodes(mysqli $conn, string $student_id) {

    $stmt = $conn->prepare("
        SELECT DISTINCT UPPER(TRIM(course_code)) AS course_code
        FROM semester_result
        WHERE student_id = ?
        AND course_code IS NOT NULL
    ");

    $stmt->bind_param("s", $student_id);
    $stmt->execute();

    $result = $stmt->get_result();
    $completed = [];

    while ($row = $result->fetch_assoc()) {
        $completed[] = $row["course_code"];
    }

    return $completed;
}

/**
 * Get student info
 */
function getStudentInfo(mysqli $conn, string $student_id) {

    $stmt = $conn->prepare("
        SELECT KR, MN
        FROM semester_result
        WHERE student_id = ?
    ");

    $stmt->bind_param("s", $student_id);
    $stmt->execute();

    $res = $stmt->get_result();

    $totalCredits = 0;
    $totalPoints = 0;

    while ($row = $res->fetch_assoc()) {
        $totalCredits += (float)$row['KR'];
        $totalPoints  += (float)$row['MN'];
    }

    $cgpa = $totalCredits > 0 ? ($totalPoints / $totalCredits) : 0;

    return [
        "cgpa" => $cgpa,
        "total_credits" => $totalCredits
    ];
}


function checkPrerequisites(mysqli $conn, string $student_id, int $course_id) {

    $student = getStudentInfo($conn, $student_id);

    $cgpa = floatval($student["cgpa"] ?? 0);
    $credits = intval($student["total_credits"] ?? 0);

    $completed = getCompletedCourseCodes($conn, $student_id);

    $stmt = $conn->prepare("
        SELECT prerequisite_course_id, min_credits, min_cgpa, rule_type
        FROM course_prerequisite
        WHERE course_id = ?
    ");

    $stmt->bind_param("i", $course_id);
    $stmt->execute();

    $result = $stmt->get_result();

    $missing = [];

    while ($row = $result->fetch_assoc()) {

        $ruleType = strtoupper($row["rule_type"]);

        // =========================
        // COURSE RULE
        // =========================
        if ($ruleType === "COURSE") {

            $stmt2 = $conn->prepare("
                SELECT UPPER(course_code) AS course_code
                FROM course
                WHERE course_id = ?
            ");

            $stmt2->bind_param("i", $row["prerequisite_course_id"]);
            $stmt2->execute();

            $res2 = $stmt2->get_result()->fetch_assoc();

            $code = $res2["course_code"] ?? null;

            if (!$code || !in_array($code, $completed)) {
                $missing[] = $code ?? "Unknown course prerequisite";
            }
        }

        // =========================
        // CREDIT RULE (FIXED TYPE)
        // =========================
        if ($ruleType === "CREDIT") {

            if ($credits < $row["min_credits"]) {
                $missing[] = "Minimum " . $row["min_credits"] . " credits required";
            }
        }

        // =========================
        // CGPA RULE (FIXED TYPE)
        // =========================
        if ($ruleType === "CREDIT_CGPA") {

            if ($credits < $row["min_credits"]) {
                $missing[] = "Minimum " . $row["min_credits"] . " credits required";
            }

            if ($cgpa < $row["min_cgpa"]) {
                $missing[] = "Minimum CGPA " . $row["min_cgpa"] . " required";
            }
        }
    }

    if (count($missing) > 0) {
        return [
            "ok" => false,
            "missing" => $missing
        ];
    }

    return ["ok" => true];
}
?>