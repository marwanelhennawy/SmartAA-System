<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once "../db_connect.php";

/* ==================================
   CHECK LOGIN
================================== */

if (!isset($_SESSION['student_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Student not logged in"
    ]);
    exit;
}

$student_id = trim($_SESSION['student_id']);

/* ==================================
   CHECK FILE
================================== */

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {

    echo json_encode([
        "success" => false,
        "message" => "No file uploaded"
    ]);
    exit;
}

/* ==================================
   VALIDATE PDF
================================== */

$extension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));

if ($extension !== "pdf") {

    echo json_encode([
        "success" => false,
        "message" => "Only PDF files are allowed"
    ]);
    exit;
}

/* ==================================
   CREATE UPLOAD FOLDER
================================== */

$uploadDir = "../uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* ==================================
   SAVE FILE
================================== */

$fileName =
    time() . "_" .
    preg_replace("/[^A-Za-z0-9._-]/", "_", $_FILES['file']['name']);

$filePath = $uploadDir . $fileName;

/* ==================================
   SAVE FILE TO SERVER
================================== */

if (!move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to save file"
    ]);
    exit;
}

/* ==================================
   DUPLICATE CHECK (IMPORTANT FIX)
================================== */

$fileHash = md5_file($filePath);

$check = $conn->prepare("
    SELECT upload_id 
    FROM result_upload 
    WHERE student_id = ? AND file_name = ?
    LIMIT 1
");

$check->bind_param("is", $student_id, $fileName);
$check->execute();
$exists = $check->get_result()->fetch_assoc();

if ($exists) {

    echo json_encode([
        "success" => false,
        "message" => "Duplicate upload detected"
    ]);
    exit;
}

/* ==================================
   INSERT UPLOAD RECORD
================================== */

$stmt = $conn->prepare("
    INSERT INTO result_upload
    (
        student_id,
        file_name,
        file_path
    )
    VALUES (?, ?, ?)
");

$stmt->bind_param(
    "sss",
    $student_id,
    $fileName,
    $filePath
);

if (!$stmt->execute()) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to create upload record",
        "error" => $stmt->error
    ]);
    exit;
}

$upload_id = $conn->insert_id;

/* ==================================
   PROCESS PDF
================================== */

require_once "../services/pdf_service.php";

try {

    $parsedData = processPDF(
        $filePath,
        $student_id,
        $conn,
        $upload_id
    );

    /* ==================================
       BACKFILL SEMESTER / SESSION
    ================================== */
    $updateStmt = $conn->prepare("
        UPDATE result_upload
        SET semester = ?, session = ?
        WHERE upload_id = ?
    ");

    $semesterVal = $parsedData['semester'] ?? null;
    $sessionVal = $parsedData['session'] ?? null;

    $updateStmt->bind_param("ssi", $semesterVal, $sessionVal, $upload_id);
    $updateStmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Result uploaded successfully",
        "upload_id" => $upload_id,
        "student_id" => $student_id,
        "parsed" => $parsedData
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => "PDF processing failed",
        "error" => $e->getMessage()
    ]);
}