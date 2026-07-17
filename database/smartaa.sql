-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2026 at 03:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartaa`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `course_code` varchar(10) DEFAULT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `course_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_code`, `course_name`, `credit`, `course_type`) VALUES
(3, 'ULRS3032', 'ENTREPRENEURSHIP AND INNOVATION', 3, 'core'),
(4, 'SECJ3343', 'SOFTWARE QUALITY ASSURANCE', 3, 'elective'),
(5, 'SECI1013', 'DISCRETE STRUCTURE', 3, 'core'),
(6, 'SECJ3104', 'APPLICATIONS DEVELOPMENT', 4, 'elective'),
(7, 'SECJ3563', 'COMPUTATIONAL INTELLIGENCE', 3, 'elective'),
(8, 'SECJ3623', 'MOBILE APPLICATION PROGRAMMING', 3, 'elective'),
(75, 'SECJ3303', 'INTERNET PROGRAMMING', 3, 'elective'),
(76, 'SECJ2013', 'DATA STRUCTURE AND ALGORITHM', 3, 'core'),
(77, 'SECR2043', 'OPERATING SYSTEMS', 3, 'core'),
(78, 'SECV2113', 'HUMAN COMPUTER INTERACTION', 3, 'core'),
(79, 'ULRF2672', 'ARCHERY', 2, 'elective'),
(80, 'SECJ3323', 'SOFTWARE DESIGN & ARCHITECTURE', 3, 'elective'),
(132, 'SECl1143', 'Probability & Statistical Data Analysis', 3, 'core'),
(133, 'SECR1013', 'DIGITAL LOGIC', 3, 'core'),
(134, 'SECI1113', 'COMPUTATIONAL MATHEMATICS', 3, 'core'),
(135, 'SECR2213', 'NETWORK COMMUNICATION', 3, 'core'),
(136, 'UHMS1182', 'Appreciation of Ethics and Civilizations', 2, 'university'),
(137, 'UHLM1012', 'MALAY LANGUAGE FOR COMMUNICATION 2', 2, 'university'),
(138, 'SECR1033', 'COMPUTER ORGANIZATION AND ARCHITECTURE', 3, 'core'),
(139, 'SECD2523', 'DATABASE', 3, 'core'),
(140, 'SECJ1023', 'PROGRAMMING TECHNIQUE II', 3, 'core'),
(141, 'SECD2613', 'SYSTEM ANALYSIS AND DESIGN', 3, 'core'),
(142, 'SECP1513', 'TECHNOLOGY AND INFORMATION SYSTEM', 3, 'core'),
(143, 'ULRS1012', 'VALUE AND IDENTITY', 2, 'university'),
(144, 'SECJ1013', 'PROGRAMMING TECHNIQUE I', 3, 'core'),
(145, 'SECJ2154', 'OBJECT ORIENTED PROGRAMMING', 4, 'core'),
(146, 'SECJ2203', 'SOFTWARE ENGINEERING', 3, 'core'),
(147, 'SECV2223', 'WEB PROGRAMMING', 3, 'core'),
(148, 'UHLB2122', 'PROFESSIONAL COMMUNICATION SKILLS 1', 2, 'university'),
(149, 'UHIS1022', 'PHILOSOPHY AND CURRENT ISSUES', 2, 'university'),
(150, 'SECJ2253', 'REQUIREMENT ENGINEERING & SOFTWARE MODELING', 3, 'elective'),
(151, 'SECJ2363', 'SOFTWARE PROJECT MANAGEMENT', 3, 'elective'),
(152, 'UKQF2XX2', 'SERVICE LEARNING AND COMMUNITY ENGAGEMENT', 2, 'university'),
(153, 'SCSJ3603', 'KNOWLEDGE-BASED AND EXPERT SYSTEMS', 3, 'elective'),
(154, 'SECJ3403', 'SPECIAL TOPIC IN SOFTWARE ENGINEERING', 3, 'elective'),
(155, 'SECJ3032', 'SOFTWARE ENGINEERING PROJECT I', 2, 'core'),
(156, 'UHLB3132', 'PROFESSIONAL COMMUNICATION SKILLS', 2, 'university'),
(157, 'SECJ3203', 'THEORY OF COMPUTER SCIENCE', 3, 'core'),
(158, 'SECJ3553', 'ARTIFICIAL INTELLIGENCE', 3, 'core'),
(159, 'SECJ4134', 'SOFTWARE ENGINEERING PROJECT II', 4, 'core'),
(160, 'SECD3761', 'TECHNOPRENEURSHIP SEMINAR', 1, 'core'),
(161, 'SECJ4383', 'SOFTWARE CONSTRUCTION', 3, 'elective'),
(162, 'SECJ4423', 'REAL-TIME SOFTWARE ENGINEERING', 3, 'elective'),
(163, 'SECJ4463', 'AGENT-ORIENTED SOFTWARE ENGINEERING', 3, 'elective'),
(164, 'SECJ3483', 'WEB TECHNOLOGY', 3, 'elective'),
(165, 'SECJ4118', 'INDUSTRIAL TRAINING (HW)', 8, 'core'),
(166, 'SECJ4114', 'INDUSTRIAL TRAINING REPORT', 4, 'core'),
(172, 'UHLX1112', 'Foreign Language Communication Elective', 2, NULL),
(173, 'SXXXXXX3', 'University Free Elective', 3, NULL),
(177, 'SECH5XX3', 'PRISMS Elective 1', 3, NULL),
(178, 'SECD5XX3', 'PRISMS Elective 2', 3, NULL),
(179, 'SECI1143', 'PROBABILITY AND STATISTICAL DATA ANALYSIS', 3, 'core'),
(191, 'ULRS1022', 'PHILOSOPHY AND CURRENT ISSUES', 2, 'core'),
(198, 'ULRF2182', 'DRONE TECHNOLOGY', 2, 'core'),
(225, 'UHLJ1122', 'JAPANESE FOR COMMUNICATION I', 2, 'core');

-- --------------------------------------------------------

--
-- Table structure for table `course_plan_courses`
--

CREATE TABLE `course_plan_courses` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_plan_courses`
--

INSERT INTO `course_plan_courses` (`id`, `submission_id`, `course_code`) VALUES
(1, 1, 'SECJ3032'),
(2, 1, 'UHLB3132'),
(3, 1, 'SECJ3203'),
(4, 1, 'SECJ3553'),
(5, 1, 'UHLX1112'),
(6, 1, 'SXXXXXX3'),
(7, 2, 'SECJ3032'),
(8, 2, 'UHLB3132'),
(9, 2, 'SECJ3203'),
(10, 2, 'SECJ3553'),
(11, 2, 'UHLX1112'),
(12, 2, 'SXXXXXX3'),
(13, 2, 'SECR1013'),
(14, 3, 'SECR1033'),
(15, 3, 'SECD2523'),
(16, 3, 'SECJ1023'),
(17, 3, 'SECD2613'),
(18, 3, 'SECP1513'),
(19, 3, 'ULRS1012'),
(20, 4, 'SECJ2154'),
(21, 4, 'SECJ2203'),
(22, 4, 'SECV2223'),
(23, 4, 'UHLB2122'),
(24, 4, 'ULRS1022'),
(25, 4, 'SECJ2363'),
(26, 5, 'SECV2113'),
(27, 5, 'SECJ2013'),
(28, 5, 'SECR2043'),
(29, 5, 'SECJ3303'),
(30, 5, 'SECJ3323'),
(31, 5, 'SCSJ3603'),
(32, 5, 'UKQF2XX2'),
(33, 6, 'ULRS3032'),
(34, 6, 'SECI1013'),
(35, 6, 'SECJ3104'),
(36, 6, 'SECJ3343'),
(37, 6, 'SECJ3623'),
(38, 6, 'SECJ3403'),
(39, 7, 'SECJ3032'),
(40, 7, 'UHLB3132'),
(41, 7, 'SECJ3203'),
(42, 7, 'SECJ3553'),
(43, 7, 'UHLX1112'),
(44, 7, 'SXXXXXX3'),
(45, 8, 'SECJ4134'),
(46, 8, 'SECD3761'),
(47, 8, 'SECJ4383'),
(48, 8, 'SECJ4423'),
(49, 8, 'SECJ4463'),
(50, 8, 'SECJ3483'),
(51, 9, 'SECR1013'),
(52, 9, 'SECJ3483'),
(53, 9, 'SECJ4463'),
(54, 9, 'SECJ4423'),
(55, 9, 'SECJ4383'),
(56, 9, 'SECJ4134'),
(57, 9, 'SECD3761'),
(58, 10, 'SECJ4383'),
(59, 10, 'SECJ4423'),
(60, 10, 'SECJ4463'),
(61, 10, 'SECJ3483'),
(62, 10, 'SECH5XX3'),
(63, 10, 'SECD5XX3'),
(64, 11, 'SECJ4383'),
(65, 11, 'SECJ4423'),
(66, 11, 'SECJ4134'),
(67, 11, 'SECD3761'),
(68, 11, 'SECJ4463'),
(69, 11, 'SECJ3483'),
(70, 12, 'SECR1033'),
(71, 12, 'SECD2523'),
(72, 12, 'SECJ1023'),
(73, 12, 'SECD2613'),
(74, 12, 'SECP1513'),
(75, 12, 'ULRS1012'),
(76, 13, 'SECJ2154'),
(77, 13, 'SECJ2203'),
(78, 13, 'SECV2223'),
(79, 13, 'UHLB2122'),
(80, 13, 'ULRS1022'),
(81, 14, 'SECV2113'),
(82, 14, 'SECJ2013'),
(83, 14, 'SECR2043'),
(84, 14, 'SECJ3303'),
(85, 14, 'SECJ3323'),
(86, 14, 'UKQF2XX2'),
(87, 15, 'ULRS3032'),
(88, 15, 'SECI1013'),
(89, 15, 'SECJ3104'),
(90, 15, 'SECJ3343'),
(91, 15, 'SECJ3623'),
(92, 16, 'ULRS3032'),
(93, 16, 'SECI1013'),
(94, 16, 'SECJ3104'),
(95, 16, 'SECJ3343'),
(96, 16, 'SECJ3623'),
(97, 17, 'SECJ3032'),
(98, 17, 'UHLB3132'),
(99, 17, 'SECJ3203'),
(100, 17, 'SECJ3553'),
(101, 17, 'UHLX1112'),
(102, 17, 'SXXXXXX3'),
(103, 18, 'SECJ4134'),
(104, 18, 'SECD3761'),
(105, 18, 'SECJ4383'),
(106, 18, 'SECJ4423'),
(107, 18, 'SECJ4463'),
(108, 18, 'SECJ3483'),
(109, 18, 'SECR1013'),
(110, 19, 'SECD2523'),
(111, 19, 'SECR1033'),
(112, 19, 'SECJ1023'),
(113, 19, 'SECD2613'),
(114, 19, 'SECP1513'),
(115, 19, 'ULRS1012'),
(116, 20, 'SECJ2154'),
(117, 20, 'SECJ2203'),
(118, 20, 'SECV2223'),
(119, 20, 'UHLB2122'),
(120, 20, 'ULRS1022'),
(121, 20, 'SECJ2363'),
(122, 21, 'SECJ2203'),
(123, 21, 'UKQF2XX2'),
(124, 21, 'SCSJ3603'),
(125, 21, 'SECJ3323'),
(126, 21, 'SECJ3303'),
(127, 21, 'SECR2043'),
(128, 21, 'SECJ2013'),
(129, 21, 'SECV2113'),
(130, 22, 'SECJ3032'),
(131, 22, 'UHLB3132'),
(132, 22, 'SECJ3203'),
(133, 22, 'SECJ3553'),
(134, 22, 'UHLX1112'),
(135, 22, 'SXXXXXX3'),
(136, 23, 'SECJ4383'),
(137, 23, 'SECJ4423'),
(138, 23, 'SECR1013'),
(139, 23, 'SECJ3483'),
(140, 23, 'SECJ4463'),
(141, 23, 'SECJ4134'),
(142, 24, 'SECI1143'),
(143, 24, 'SECJ1013'),
(144, 24, 'SECR1013'),
(145, 24, 'SECI1113'),
(146, 24, 'SECR2213'),
(147, 24, 'UHLM1012'),
(148, 25, 'SECJ2154'),
(149, 25, 'SECJ2203'),
(150, 25, 'SECV2223'),
(151, 25, 'UHLB2122'),
(152, 25, 'SECJ2363'),
(153, 26, 'SECJ2203'),
(154, 26, 'UKQF2XX2'),
(155, 26, 'SECJ3323'),
(156, 26, 'SECJ3303'),
(157, 26, 'SECR2043'),
(158, 26, 'SECJ2013'),
(159, 27, 'SECR1033'),
(160, 27, 'SECD2523'),
(161, 27, 'SECJ1023'),
(162, 27, 'SECD2613'),
(163, 27, 'SECP1513'),
(164, 27, 'ULRS1012'),
(165, 28, 'SECJ2203'),
(166, 28, 'SECJ2154'),
(167, 28, 'SECV2223'),
(168, 28, 'UHLB2122'),
(169, 28, 'ULRS1022');

-- --------------------------------------------------------

--
-- Table structure for table `course_plan_submission`
--

CREATE TABLE `course_plan_submission` (
  `submission_id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT NULL,
  `aa_status` varchar(20) DEFAULT 'Pending',
  `aa_comment` text DEFAULT NULL,
  `approved_by` varchar(50) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_plan_submission`
--

INSERT INTO `course_plan_submission` (`submission_id`, `student_id`, `submission_date`, `status`, `aa_status`, `aa_comment`, `approved_by`, `approved_at`) VALUES
(1, '0', '2026-06-20 11:30:52', 'Pending', 'Pending', NULL, NULL, NULL),
(2, '0', '2026-06-20 11:31:09', 'Pending', 'Pending', NULL, NULL, NULL),
(3, '0', '2026-06-20 11:54:25', 'Pending', 'Pending', NULL, NULL, NULL),
(4, '0', '2026-06-20 11:55:24', 'Pending', 'Pending', NULL, NULL, NULL),
(5, '0', '2026-06-20 11:55:46', 'Pending', 'Pending', NULL, NULL, NULL),
(6, '0', '2026-06-20 11:56:15', 'Pending', 'Pending', NULL, NULL, NULL),
(7, '0', '2026-06-20 11:56:36', 'Pending', 'Pending', NULL, NULL, NULL),
(8, '0', '2026-06-20 11:57:40', 'Pending', 'Pending', NULL, NULL, NULL),
(9, '0', '2026-06-20 11:58:48', 'Pending', 'Pending', NULL, NULL, NULL),
(10, '0', '2026-06-20 12:02:55', 'Pending', 'Pending', NULL, NULL, NULL),
(11, '0', '2026-06-20 12:05:01', 'Pending', 'Pending', NULL, NULL, NULL),
(12, '0', '2026-06-20 12:15:45', 'Pending', 'Pending', NULL, NULL, NULL),
(13, '0', '2026-06-20 12:16:32', 'Pending', 'Pending', NULL, NULL, NULL),
(14, '0', '2026-06-20 12:17:03', 'Pending', 'Pending', NULL, NULL, NULL),
(15, '0', '2026-06-20 12:17:42', 'Pending', 'Pending', NULL, NULL, NULL),
(16, '0', '2026-06-20 12:18:11', 'Pending', 'Pending', NULL, NULL, NULL),
(17, '0', '2026-06-20 12:18:39', 'Pending', 'Pending', NULL, NULL, NULL),
(18, '0', '2026-06-20 12:19:40', 'Pending', 'Pending', NULL, NULL, NULL),
(19, '0', '2026-06-26 02:09:02', 'Pending', 'Pending', NULL, NULL, NULL),
(20, '0', '2026-06-26 02:15:05', 'Pending', 'Pending', NULL, NULL, NULL),
(21, '0', '2026-06-26 02:17:48', 'Pending', 'Pending', NULL, NULL, NULL),
(22, '0', '2026-06-26 02:25:48', 'Pending', 'Pending', NULL, NULL, NULL),
(23, '0', '2026-06-26 02:27:06', 'Pending', 'Pending', NULL, NULL, NULL),
(24, '0', '2026-06-26 03:11:19', 'Pending', 'Pending', NULL, NULL, NULL),
(25, '0', '2026-06-26 03:26:38', 'Pending', 'Pending', NULL, NULL, NULL),
(26, '0', '2026-06-26 03:32:19', 'Pending', 'Pending', NULL, NULL, NULL),
(27, '0', '2026-06-29 07:11:39', 'Pending', 'Pending', NULL, NULL, NULL),
(28, '0', '2026-06-29 07:15:52', 'Pending', 'Pending', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_prerequisite`
--

CREATE TABLE `course_prerequisite` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `prerequisite_course_id` int(11) DEFAULT NULL,
  `min_credits` int(11) DEFAULT NULL,
  `min_cgpa` decimal(3,2) DEFAULT NULL,
  `rule_type` varchar(20) DEFAULT 'COURSE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_prerequisite`
--

INSERT INTO `course_prerequisite` (`id`, `course_id`, `prerequisite_course_id`, `min_credits`, `min_cgpa`, `rule_type`) VALUES
(1, 140, 144, NULL, NULL, 'COURSE'),
(2, 138, 133, NULL, NULL, 'COURSE'),
(3, 76, 144, NULL, NULL, 'COURSE'),
(4, 76, 140, NULL, NULL, 'COURSE'),
(6, 77, 138, NULL, NULL, 'COURSE'),
(7, 145, 140, NULL, NULL, 'COURSE'),
(8, 150, 146, NULL, NULL, 'COURSE'),
(9, 75, 145, NULL, NULL, 'COURSE'),
(10, 75, 147, NULL, NULL, 'COURSE'),
(12, 80, 146, NULL, NULL, 'COURSE'),
(13, 6, 139, NULL, NULL, 'COURSE'),
(14, 6, 145, NULL, NULL, 'COURSE'),
(15, 6, 146, NULL, NULL, 'COURSE'),
(16, 6, 147, NULL, NULL, 'COURSE'),
(20, 158, 76, NULL, NULL, 'COURSE'),
(21, 4, 146, NULL, NULL, 'COURSE'),
(22, 7, 158, NULL, NULL, 'COURSE'),
(23, 8, 145, NULL, NULL, 'COURSE'),
(24, 164, 145, NULL, NULL, 'COURSE'),
(25, 164, 147, NULL, NULL, 'COURSE'),
(27, 159, 155, NULL, NULL, 'COURSE'),
(28, 157, 144, NULL, NULL, 'COURSE'),
(29, 157, 76, NULL, NULL, 'COURSE'),
(31, 161, 146, NULL, NULL, 'COURSE'),
(32, 162, 146, NULL, NULL, 'COURSE'),
(33, 155, NULL, 80, NULL, 'CREDIT'),
(34, 165, NULL, 92, 2.00, 'CREDIT_CGPA'),
(35, 166, NULL, 92, 2.00, 'CREDIT_CGPA');

-- --------------------------------------------------------

--
-- Table structure for table `programme_structure`
--

CREATE TABLE `programme_structure` (
  `structure_id` int(11) NOT NULL,
  `intake_year` int(11) NOT NULL,
  `intake_month` varchar(20) NOT NULL,
  `programme` varchar(100) NOT NULL,
  `year_no` int(11) NOT NULL,
  `semester_no` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `prerequisite` varchar(255) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `minimum_credits` int(11) DEFAULT NULL,
  `minimum_cgpa` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programme_structure`
--

INSERT INTO `programme_structure` (`structure_id`, `intake_year`, `intake_month`, `programme`, `year_no`, `semester_no`, `course_id`, `prerequisite`, `course_code`, `minimum_credits`, `minimum_cgpa`) VALUES
(1, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 179, NULL, 'SECI1143', NULL, NULL),
(2, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 144, NULL, 'SECJ1013', NULL, NULL),
(3, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 133, NULL, 'SECR1013', NULL, NULL),
(4, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 134, NULL, 'SECI1113', NULL, NULL),
(5, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 135, NULL, 'SECR2213', NULL, NULL),
(6, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 136, NULL, 'UHMS1182', NULL, NULL),
(7, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 1, 137, NULL, 'UHLM1012', NULL, NULL),
(8, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 2, 138, 'SECR1013', 'SECR1033', NULL, NULL),
(9, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 2, 139, NULL, 'SECD2523', NULL, NULL),
(10, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 2, 140, 'SECJ1013', 'SECJ1023', NULL, NULL),
(11, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 2, 141, 'SECR1013', 'SECD2613', NULL, NULL),
(12, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 2, 142, NULL, 'SECP1513', NULL, NULL),
(13, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 1, 2, 143, NULL, 'ULRS1012', NULL, NULL),
(14, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 145, 'SECJ1023', 'SECJ2154', NULL, NULL),
(15, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 146, NULL, 'SECJ2203', NULL, NULL),
(16, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 147, NULL, 'SECV2223', NULL, NULL),
(17, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 148, NULL, 'UHLB2122', NULL, NULL),
(18, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 191, NULL, 'ULRS1022', NULL, NULL),
(19, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 150, 'SECJ2203', 'SECJ2253', NULL, NULL),
(20, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 1, 151, 'SECJ2203', 'SECJ2363', NULL, NULL),
(21, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 78, NULL, 'SECV2113', NULL, NULL),
(22, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 76, 'SECJ1013,SECJ1023', 'SECJ2013', NULL, NULL),
(23, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 77, 'SECR1033', 'SECR2043', NULL, NULL),
(24, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 75, 'SECJ2154,SECV2223', 'SECJ3303', NULL, NULL),
(25, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 80, 'SECJ2203', 'SECJ3323', NULL, NULL),
(26, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 153, 'SECJ3533', 'SCSJ3603', NULL, NULL),
(27, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 3, NULL, 'ULRS3032', NULL, NULL),
(28, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 5, NULL, 'SECI1013', NULL, NULL),
(29, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 6, 'SECJ2203,SECD2523,SECV2223,SECJ2154', 'SECJ3104', NULL, NULL),
(30, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 4, 'SECJ2203', 'SECJ3343', NULL, NULL),
(31, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 7, 'SECJ3553', 'SECJ3563', NULL, NULL),
(32, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 8, 'SECJ2154', 'SECJ3623', NULL, NULL),
(33, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 1, 154, NULL, 'SECJ3403', NULL, NULL),
(34, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 2, 155, 'SECJ3104,80 credits', 'SECJ3032', 80, NULL),
(35, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 2, 156, NULL, 'UHLB3132', NULL, NULL),
(36, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 2, 157, 'SECI1013,SECJ2013', 'SECJ3203', NULL, NULL),
(37, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 2, 158, 'SECJ2013', 'SECJ3553', NULL, NULL),
(38, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 159, 'SECJ3032', 'SECJ4134', NULL, NULL),
(39, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 160, NULL, 'SECD3761', NULL, NULL),
(40, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 161, 'SECJ2203', 'SECJ4383', NULL, NULL),
(41, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 162, 'SECJ2203', 'SECJ4423', NULL, NULL),
(42, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 163, 'SECJ2203,SECJ2154', 'SECJ4463', NULL, NULL),
(43, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 164, 'SECJ2154,SECV2223', 'SECJ3483', NULL, NULL),
(44, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 2, 165, '92 credits + CGPA>=2.0', 'SECJ4118', 92, 2.00),
(45, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 2, 166, '92 credits + CGPA>=2.0', 'SECJ4114', 92, 2.00),
(47, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 2, 2, 152, NULL, 'UKQF2xx2', NULL, NULL),
(48, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 2, 172, NULL, 'UHLX1112', NULL, NULL),
(49, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 3, 2, 173, NULL, 'SXXXXXX3', NULL, NULL),
(50, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 177, NULL, 'SECH5XX3', NULL, NULL),
(51, 2022, 'March', 'Bachelor of Computer Science (Software Engineering)', 4, 1, 178, NULL, 'SECD5XX3', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `result_upload`
--

CREATE TABLE `result_upload` (
  `upload_id` int(11) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `session` varchar(20) DEFAULT NULL,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `result_upload`
--

INSERT INTO `result_upload` (`upload_id`, `student_id`, `semester`, `session`, `upload_date`, `file_name`, `file_path`) VALUES
(50, 'A22MJ3007', '2', '2022/2023', '2026-06-29 07:08:17', '1782716897_examinationSlipUg_pdf.pdf', '../uploads/1782716897_examinationSlipUg_pdf.pdf'),
(51, 'A22MJ3007', '1', '2023/2024', '2026-06-29 07:14:26', '1782717265_examinationSlipUg_pdf__1_.pdf', '../uploads/1782717265_examinationSlipUg_pdf__1_.pdf'),
(52, 'A22MJ3007', '2', '2023/2024', '2026-06-29 07:15:59', '1782717359_examinationSlipUg_pdf__2_.pdf', '../uploads/1782717359_examinationSlipUg_pdf__2_.pdf'),
(53, 'A22MJ3007', '2', '2024/2025', '2026-06-29 07:16:03', '1782717363_examinationSlipUg_pdf__4_.pdf', '../uploads/1782717363_examinationSlipUg_pdf__4_.pdf'),
(54, 'A22MJ3007', '1', '2025/2026', '2026-06-29 07:16:09', '1782717369_examinationSlipUg_pdf__5_.pdf', '../uploads/1782717369_examinationSlipUg_pdf__5_.pdf'),
(55, 'A22MJ3007', '2', '2023/2024', '2026-06-29 07:16:13', '1782717373_examinationSlipUg_pdf__2_.pdf', '../uploads/1782717373_examinationSlipUg_pdf__2_.pdf'),
(56, 'A22MJ3007', '1', '2023/2024', '2026-06-29 07:19:15', '1782717555_examinationSlipUg_pdf__1_.pdf', '../uploads/1782717555_examinationSlipUg_pdf__1_.pdf'),
(57, 'A22MJ3007', '2', '2023/2024', '2026-06-29 07:19:20', '1782717560_examinationSlipUg_pdf__2_.pdf', '../uploads/1782717560_examinationSlipUg_pdf__2_.pdf'),
(58, 'A22MJ3007', '2', '2022/2023', '2026-06-29 07:33:50', '1782718430_examinationSlipUg_pdf.pdf', '../uploads/1782718430_examinationSlipUg_pdf.pdf'),
(59, 'A22MJ3007', '2', '2022/2023', '2026-06-29 07:46:58', '1782719218_examinationSlipUg_pdf.pdf', '../uploads/1782719218_examinationSlipUg_pdf.pdf'),
(60, 'A22MJ3007', '2', '2022/2023', '2026-06-29 07:47:19', '1782719239_examinationSlipUg_pdf.pdf', '../uploads/1782719239_examinationSlipUg_pdf.pdf'),
(61, 'A22MJ3007', '2', '2022/2023', '2026-06-29 07:49:47', '1782719387_examinationSlipUg_pdf.pdf', '../uploads/1782719387_examinationSlipUg_pdf.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `semester_result`
--

CREATE TABLE `semester_result` (
  `result_id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `grade` varchar(2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `MN` decimal(4,2) DEFAULT NULL,
  `KR` int(11) DEFAULT NULL,
  `JMN` decimal(6,2) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `session` varchar(20) DEFAULT NULL,
  `upload_id` int(11) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `year_level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester_result`
--

INSERT INTO `semester_result` (`result_id`, `student_id`, `course_id`, `grade`, `status`, `MN`, `KR`, `JMN`, `semester`, `session`, `upload_id`, `course_code`, `course_name`, `year_level`) VALUES
(212, 'A22MJ3007', 179, 'A', 'Pass', 4.00, 3, 12.00, '2', '2022/2023', 61, 'SECI1143', 'PROBABILITY AND STATISTICAL DATA ANALYSIS', 1),
(213, 'A22MJ3007', 144, 'A-', 'Pass', 3.67, 3, 11.01, '2', '2022/2023', 61, 'SECJ1013', 'PROGRAMMING TECHNIQUE I', 1),
(214, 'A22MJ3007', 134, 'A', 'Pass', 4.00, 3, 12.00, '2', '2022/2023', 61, 'SECI1113', 'COMPUTATIONAL MATHEMATICS', 1),
(215, 'A22MJ3007', 137, 'A', 'Pass', 4.00, 2, 8.00, '2', '2022/2023', 61, 'UHLM1012', 'MALAY LANGUAGE FOR COMMUNICATION 2', 1),
(216, 'A22MJ3007', 135, 'A-', 'Pass', 3.67, 3, 11.01, '2', '2022/2023', 61, 'SECR2213', 'NETWORK COMMUNICATION', 1),
(217, 'A22MJ3007', 133, 'A-', 'Pass', 3.67, 3, 11.01, '2', '2022/2023', 61, 'SECR1013', 'DIGITAL LOGIC', 1),
(218, 'A22MJ3007', 139, 'A', 'Pass', 4.00, 3, 12.00, '1', '2023/2024', 56, 'SECD2523', 'DATABASE', 1),
(219, 'A22MJ3007', 141, 'A', 'Pass', 4.00, 3, 12.00, '1', '2023/2024', 56, 'SECD2613', 'SYSTEM ANALYSIS AND DESIGN', 1),
(220, 'A22MJ3007', 140, 'A', 'Pass', 4.00, 3, 12.00, '1', '2023/2024', 56, 'SECJ1023', 'PROGRAMMING TECHNIQUE II', 1),
(221, 'A22MJ3007', 142, 'A+', 'Pass', 4.00, 3, 12.00, '1', '2023/2024', 56, 'SECP1513', 'TECHNOLOGY AND INFORMATION SYSTEM', 1),
(222, 'A22MJ3007', 138, 'A', 'Pass', 4.00, 3, 12.00, '1', '2023/2024', 56, 'SECR1033', 'COMPUTER ORGANIZATION AND ARCHITECTURE', 1),
(223, 'A22MJ3007', 143, 'A', 'Pass', 4.00, 2, 8.00, '1', '2023/2024', 56, 'ULRS1012', 'VALUE AND IDENTITY', 1),
(224, 'A22MJ3007', 191, 'A', 'Pass', 4.00, 2, 8.00, '2', '2023/2024', 57, 'ULRS1022', 'PHILOSOPHY AND CURRENT ISSUES', 2),
(225, 'A22MJ3007', 146, 'B+', 'Pass', 3.33, 3, 9.99, '2', '2023/2024', 57, 'SECJ2203', 'SOFTWARE ENGINEERING', 2),
(226, 'A22MJ3007', 147, 'A-', 'Pass', 3.67, 3, 11.01, '2', '2023/2024', 57, 'SECV2223', 'WEB PROGRAMMING', 2),
(227, 'A22MJ3007', 150, 'A', 'Pass', 4.00, 3, 12.00, '2', '2023/2024', 57, 'SECJ2253', 'REQUIREMENT ENGINEERING & SOFTWARE MODELING', 2),
(228, 'A22MJ3007', 145, 'A', 'Pass', 4.00, 4, 16.00, '2', '2023/2024', 57, 'SECJ2154', 'OBJECT ORIENTED PROGRAMMING', 2),
(229, 'A22MJ3007', 148, 'A', 'Pass', 4.00, 2, 8.00, '2', '2023/2024', 57, 'UHLB2122', 'PROFESSIONAL COMMUNICATION SKILLS 1', 2),
(230, 'A22MJ3007', 3, 'A+', 'Pass', 4.00, 2, 8.00, '2', '2024/2025', 53, 'ULRS3032', 'ENTREPRENEURSHIP AND INNOVATION', 3),
(231, 'A22MJ3007', 4, 'B+', 'Pass', 3.33, 3, 9.99, '2', '2024/2025', 53, 'SECJ3343', 'SOFTWARE QUALITY ASSURANCE', 3),
(232, 'A22MJ3007', 5, 'A', 'Pass', 4.00, 3, 12.00, '2', '2024/2025', 53, 'SECI1013', 'DISCRETE STRUCTURE', 3),
(233, 'A22MJ3007', 6, 'A', 'Pass', 4.00, 4, 16.00, '2', '2024/2025', 53, 'SECJ3104', 'APPLICATIONS DEVELOPMENT', 3),
(234, 'A22MJ3007', 7, 'A-', 'Pass', 3.67, 3, 11.01, '2', '2024/2025', 53, 'SECJ3563', 'COMPUTATIONAL INTELLIGENCE', 3),
(235, 'A22MJ3007', 8, 'A', 'Pass', 4.00, 3, 12.00, '2', '2024/2025', 53, 'SECJ3623', 'MOBILE APPLICATION PROGRAMMING', 3),
(236, 'A22MJ3007', 155, 'A', 'Pass', 4.00, 2, 8.00, '1', '2025/2026', 54, 'SECJ3032', 'SOFTWARE ENGINEERING PROJECT I', 3),
(237, 'A22MJ3007', 157, 'A', 'Pass', 4.00, 3, 12.00, '1', '2025/2026', 54, 'SECJ3203', 'THEORY OF COMPUTER SCIENCE', 3),
(238, 'A22MJ3007', 158, 'A', 'Pass', 4.00, 3, 12.00, '1', '2025/2026', 54, 'SECJ3553', 'ARTIFICIAL INTELLIGENCE', 3),
(239, 'A22MJ3007', 156, 'A', 'Pass', 4.00, 2, 8.00, '1', '2025/2026', 54, 'UHLB3132', 'PROFESSIONAL COMMUNICATION SKILLS', 3),
(240, 'A22MJ3007', 225, 'B-', 'Pass', 2.67, 2, 5.34, '1', '2025/2026', 54, 'UHLJ1122', 'JAPANESE FOR COMMUNICATION I', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `intake_year` int(11) DEFAULT NULL,
  `intake_month` varchar(20) DEFAULT NULL,
  `cgpa` decimal(3,2) DEFAULT NULL,
  `total_credits` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `campus` varchar(100) DEFAULT NULL,
  `programme` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `name`, `intake_year`, `intake_month`, `cgpa`, `total_credits`, `email`, `phone`, `campus`, `programme`, `password`) VALUES
('A22MJ3007', 'Marwan Sameh', 2022, 'March', 0.00, 0, 'marwan@gmail.com', '0123456789', 'UTM MJIIT', 'Bachelor of Computer Science (Software Engineering)', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_code_3` (`course_code`),
  ADD UNIQUE KEY `course_code_4` (`course_code`);

--
-- Indexes for table `course_plan_courses`
--
ALTER TABLE `course_plan_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_plan_submission`
--
ALTER TABLE `course_plan_submission`
  ADD PRIMARY KEY (`submission_id`);

--
-- Indexes for table `course_prerequisite`
--
ALTER TABLE `course_prerequisite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_prereq` (`course_id`,`prerequisite_course_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `prerequisite_course_id` (`prerequisite_course_id`);

--
-- Indexes for table `programme_structure`
--
ALTER TABLE `programme_structure`
  ADD PRIMARY KEY (`structure_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `idx_programme` (`intake_year`,`intake_month`,`programme`);

--
-- Indexes for table `result_upload`
--
ALTER TABLE `result_upload`
  ADD PRIMARY KEY (`upload_id`),
  ADD UNIQUE KEY `unique_student_file` (`student_id`,`file_name`);

--
-- Indexes for table `semester_result`
--
ALTER TABLE `semester_result`
  ADD PRIMARY KEY (`result_id`),
  ADD UNIQUE KEY `unique_student_course_sem` (`student_id`,`course_code`,`semester`,`session`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=538;

--
-- AUTO_INCREMENT for table `course_plan_courses`
--
ALTER TABLE `course_plan_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `course_plan_submission`
--
ALTER TABLE `course_plan_submission`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `course_prerequisite`
--
ALTER TABLE `course_prerequisite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `programme_structure`
--
ALTER TABLE `programme_structure`
  MODIFY `structure_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `result_upload`
--
ALTER TABLE `result_upload`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `semester_result`
--
ALTER TABLE `semester_result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_prerequisite`
--
ALTER TABLE `course_prerequisite`
  ADD CONSTRAINT `course_prerequisite_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `course_prerequisite_ibfk_2` FOREIGN KEY (`prerequisite_course_id`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `programme_structure`
--
ALTER TABLE `programme_structure`
  ADD CONSTRAINT `programme_structure_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `semester_result`
--
ALTER TABLE `semester_result`
  ADD CONSTRAINT `fk_student_result` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `semester_result_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
