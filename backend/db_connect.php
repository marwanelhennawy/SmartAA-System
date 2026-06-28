<?php
$conn = new mysqli("localhost", "root", "", "smartaa");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>