<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Smalot\PdfParser\Parser;

function processPDF(
    string $filePath,
    string $student_id,
    mysqli $conn,
    int $upload_id
) {

    $parser = new Parser();
    $pdf = $parser->parseFile($filePath);
    $text = $pdf->getText();

    $lines = explode("\n", $text);

    $semester = null;
    $session = null;
    $year = null;

    /* =========================
       EXTRACT META DATA
    ========================= */
    foreach ($lines as $line) {

        $line = str_replace("\xC2\xA0", ' ', $line);
        $line = trim(preg_replace('/\s+/', ' ', $line));

        if (preg_match('/SEMESTER\s+(\d+)/i', $line, $m)) {
            $semester = $m[1];
        }

        if (preg_match('/SESSION\s+([\d\/]+)/i', $line, $m)) {
            $session = $m[1];
        }

        if (preg_match('/YEAR\s*:\s*(\d+)/i', $line, $m)) {
            $year = $m[1];
        }
    }

    /* =========================
       PROCESS COURSES
    ========================= */
    foreach ($lines as $line) {

        $line = str_replace("\xC2\xA0", ' ', $line);
        $line = trim(preg_replace('/\s+/', ' ', $line));

        if (!preg_match('/^[A-Z]{4}\d{4}/', $line)) {
            continue;
        }

        $parts = explode(" ", $line);
        if (count($parts) < 6) continue;

        $JMN = array_pop($parts);
        $KR  = array_pop($parts);
        $MN  = array_pop($parts);
        $GR  = array_pop($parts);

        $CODE = array_shift($parts);
        $COURSE = implode(" ", $parts);

        $status = ($GR == 'F') ? 'Fail' : 'Pass';

        /* =========================
           INSERT / UPDATE COURSE
        ========================= */
        $stmt = $conn->prepare("
            INSERT INTO course (course_code, course_name, credit, course_type)
            VALUES (?, ?, ?, 'core')
            ON DUPLICATE KEY UPDATE course_name = VALUES(course_name)
        ");

        $stmt->bind_param("ssi", $CODE, $COURSE, $KR);
        $stmt->execute();

        /* =========================
           GET COURSE ID
        ========================= */
        $course_id = null;

        $stmt = $conn->prepare("
            SELECT course_id
            FROM course
            WHERE course_code = ?
            LIMIT 1
        ");

        $stmt->bind_param("s", $CODE);
        $stmt->execute();

        $res = $stmt->get_result();

        if ($row = $res->fetch_assoc()) {
            $course_id = $row['course_id'];
        }

        /* =========================
           INSERT SEMESTER RESULT
        ========================= */
        $stmt = $conn->prepare("
        INSERT INTO semester_result (
            student_id,
            course_id,
            course_code,
            course_name,
            grade,
            status,
            MN,
            KR,
            JMN,
            semester,
            session,
            year_level,
            upload_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            grade = VALUES(grade),
            status = VALUES(status),
            MN = VALUES(MN),
            KR = VALUES(KR),
            JMN = VALUES(JMN),
            course_name = VALUES(course_name),
            upload_id = VALUES(upload_id)
        ");

        $stmt->bind_param(
            "sissssddddssi",
            $student_id,
            $course_id,
            $CODE,
            $COURSE,
            $GR,
            $status,
            $MN,
            $KR,
            $JMN,
            $semester,
            $session,
            $year,
            $upload_id
        );

        try {
        $stmt->execute();
        } catch (mysqli_sql_exception $e) {

            // duplicate entry OR FK issue
            if ($conn->errno == 1062) {
                // duplicate → ignore safely
                continue;
            }

            // other errors → log
            error_log($e->getMessage());
        }
    }

    return [
        "semester" => $semester,
        "session" => $session,
        "year" => $year
    ];
}