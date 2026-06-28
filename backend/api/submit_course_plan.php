<?php
file_put_contents("debug_log.txt", file_get_contents("php://input"));
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {

    include "../db_connect.php";
    include "../api/prerequisite_service.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $student_id = $data["student_id"] ?? null;
    $courses = $data["courses"] ?? [];
    $credits = $data["credits"] ?? 0;

    if (!$student_id || empty($courses)) {
        echo json_encode([
            "success" => false,
            "message" => "Missing student ID or courses"
        ]);
        exit;
    }

    foreach ($courses as $courseCode) {

        $stmt = $conn->prepare("
            SELECT course_id
            FROM course
            WHERE course_code = ?
        ");

        $stmt->bind_param("s", $courseCode);
        $stmt->execute();

        $course = $stmt->get_result()->fetch_assoc();

        if (!$course) {
            echo json_encode([
                "success" => false,
                "message" => "Invalid course: " . $courseCode
            ]);
            exit;
        }

        $check = checkPrerequisites($conn, $student_id, $course["course_id"]);

        if (!$check["ok"]) {
            echo json_encode([
                "success" => false,
                "message" => "Prerequisites not met",
                "errors" => $check["missing"],
                "blocked_course" => $courseCode
            ]);
            exit;
        }
    }

    // =========================
    // INSERT SUBMISSION
    // =========================
    $status = "Pending";
    $aa_status = "Pending";

    $stmt = $conn->prepare("
        INSERT INTO course_plan_submission (student_id, status, aa_status)
        VALUES (?, ?, ?)
    ");

    $stmt->bind_param("iss", $student_id, $status, $aa_status);
    $stmt->execute();

    $submission_id = $stmt->insert_id;

    // =========================
    // INSERT COURSES
    // =========================
    $stmt2 = $conn->prepare("
        INSERT INTO course_plan_courses (submission_id, course_code)
        VALUES (?, ?)
    ");

    foreach ($courses as $course_code) {
        $stmt2->bind_param("is", $submission_id, $course_code);
        $stmt2->execute();
    }

    echo json_encode([
        "success" => true,
        "message" => "Course plan submitted successfully",
        "submission_id" => $submission_id
    ]);

    $conn->close();

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Server error: " . $e->getMessage()
    ]);
}
?>