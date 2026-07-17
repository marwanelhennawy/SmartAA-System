# 📘 SmartAA System — Full Stack Academic Advisor Platform

## 📌 Overview

SmartAA is a full-stack academic advisory system designed to help students automatically plan their university courses, check prerequisites, and track academic progress in a structured and intelligent way.

The system replaces manual course planning (spreadsheets / consultation) with a centralized web-based platform that provides automated recommendations, prerequisite validation, and progress tracking.

## 📌 Video Demo
https://youtu.be/4_OwifOlD1w?si=eyRS3hVebLzaMOn6

## 🎯 Key Features

**🧠 Intelligent Course Planning**
- Suggests suitable courses based on student progress
- Prevents invalid course selection using prerequisite validation
- Supports semester-based planning

**📄 PDF Academic Result Processing**
- Upload academic result slips (PDF)
- Extract and process data automatically
- Store structured results in database

**📊 Student Dashboard**
- Displays academic progress
- Shows completed, in-progress, and pending courses
- Provides CGPA-related insights

**🔐 Authentication System**
- Secure login/logout system
- Session-based authentication
- Protected API routes

**⚙️ Prerequisite Validation Engine**
- Ensures students meet course requirements before enrollment
- Backend-driven rule validation logic

> **Note:** Course Structure and Course Planning currently only support the **SECJH 2022 March intake** — that is the only intake structure available in the database at this time.

## 🏗️ System Architecture

```
Frontend (React + TypeScript + Vite)
        ↓ API Calls
Backend (PHP REST API)
        ↓
MySQL Database
        ↓
PDF Processing Service (PHP)
```

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- TypeScript
- Tailwind CSS
- ShadCN UI Components

**Backend**
- PHP (REST API)
- MySQL
- Composer (dependencies)

**Other Tools**
- XAMPP (local development)
- Git & GitHub version control

## 📁 Project Structure

```
SmartAA-System/
│
├── backend/                  # deployed as SMARTAA-FULLSTACK/ under htdocs
│   ├── api/                  # REST API endpoints
│   ├── services/             # Business logic (PDF, validation)
│   ├── assets/                # CSS/JS
│   ├── uploads/               # Uploaded PDF files
│   ├── composer.json          # PHP dependency declarations
│   ├── composer.lock           # locked dependency versions
│   ├── db_connect.php          # DB host / name / username / password
│   └── index.html
│
├── frontend/
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # App pages
│   │   ├── lib/               # Utilities & mock data
│   │   └── App.tsx
│   └── public/
│
├── smartaa.sql                # database schema + sample data
└── .gitignore
```

## 🚀 Setup Instructions

### 1. Requirements

- Windows 10 or 11
- XAMPP (Apache + MySQL enabled)
- Node.js v18+ and npm
- Git
- Modern web browser (Chrome recommended)
- 8 GB RAM, 2 GB free disk space, internet connection

### 2. Clone the Repository

```bash
git clone https://github.com/marwanelhennawy/SmartAA-System.git
```
Or download the ZIP from GitHub and extract it.

### 3. Backend Setup (XAMPP)

- Start Apache and MySQL from the XAMPP Control Panel (both must show green)
- Copy the backend folder into your XAMPP htdocs directory:
  ```
  C:\xampp\htdocs\SMARTAA-FULLSTACK\
  ```
- The backend API should now be reachable at:
  ```
  http://localhost/SMARTAA-FULLSTACK/backend/
  ```

### 4. Install Backend Dependencies (Composer)

The backend ships with `composer.json` and `composer.lock`, but the actual dependency files (`vendor/`) are not committed to the repo — install them locally:

```bash
cd backend
composer install
```

This reads `composer.lock` and downloads the exact dependency versions into a `vendor/` folder. Without this step the backend will throw an error such as `Failed to open stream: vendor/autoload.php`.

### 5. Database Setup (MySQL)

- Open phpMyAdmin: `http://localhost/phpmyadmin`
- Click **Import** → select `smartaa.sql` → click **Go**
- This creates a `smartaa` database with all required tables and sample data
- Open `backend/db_connect.php` and confirm it matches your local setup:
  ```php
  $host = "localhost";
  $dbname = "smartaa";
  $username = "root";
  $password = "";
  ```

### 6. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The terminal will show a local URL, typically `http://localhost:5173`.

### 7. Running the System

Two services must be running at the same time:

- **XAMPP:** Apache + MySQL
- **Terminal:** `cd frontend && npm run dev`

Then open your browser to `http://localhost:5173`.

### 8. Login Credentials

Sample student account (from the seeded database):
```
Email: marwan@gmail.com
Password: 1234
```
If different, check the `student` table in the `smartaa` database.

## 🧠 Core Modules Explained

**📌 Course Recommendation Engine**
Implements logic to suggest courses based on:
- Completed subjects
- Semester structure
- Prerequisite rules

**📌 Prerequisite Service**
Validates course eligibility before submission:
- Checks dependency tree
- Prevents invalid course selection

**📌 PDF Processing Pipeline**
- Student uploads PDF result slip
- Backend extracts content
- Data parsed into structured format (Course Code, Course Name, Grade, Credit Hours, Semester, CGPA)
- Stored in MySQL database

## 🛠️ Troubleshooting

| Issue | Fix |
|---|---|
| Frontend not loading | `cd frontend && npm install && npm run dev` |
| `vendor/autoload.php` not found | Run `cd backend && composer install` |
| Database connection error | Verify Apache and MySQL are running, the database name is `smartaa`, and credentials in `db_connect.php` are correct |
| API errors | Confirm the backend folder exists at `C:\xampp\htdocs\SMARTAA-FULLSTACK\` and API URLs load in the browser |
| Blank page | Open DevTools (F12) → Console tab for JavaScript errors |

## 📈 Future Improvements

- AI-powered course recommendation system
- Mobile application version
- Admin analytics dashboard
- OCR-based PDF parsing upgrade
- Deployment on cloud (AWS / Vercel + PHP backend)

## 👨‍💻 Author

**Marwan Elhennawy**
Computer Science Student
Focused on Full-Stack Development & Intelligent Systems

## 📌 License

This project is for academic and portfolio purposes.
