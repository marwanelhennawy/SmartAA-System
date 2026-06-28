📘 SmartAA System — Full Stack Academic Advisor Platform
📌 Overview

SmartAA is a full-stack academic advisory system designed to help students automatically plan their university courses, check prerequisites, and track academic progress in a structured and intelligent way.

The system replaces manual course planning (spreadsheets / consultation) with a centralized web-based platform that provides automated recommendations, prerequisite validation, and progress tracking.

🎯 Key Features
🧠 Intelligent Course Planning
Suggests suitable courses based on student progress
Prevents invalid course selection using prerequisite validation
Supports semester-based planning

📄 PDF Academic Result Processing
Upload academic result slips (PDF)
Extract and process data automatically
Store structured results in database

📊 Student Dashboard
Displays academic progress
Shows completed, in-progress, and pending courses
Provides CGPA-related insights

🔐 Authentication System
Secure login/logout system
Session-based authentication
Protected API routes

⚙️ Prerequisite Validation Engine
Ensures students meet course requirements before enrollment
Backend-driven rule validation logic

🏗️ System Architecture
Frontend (React + TypeScript + Vite)
        ↓ API Calls
Backend (PHP REST API)
        ↓
MySQL Database
        ↓
PDF Processing Service (PHP)

🧰 Tech Stack
Frontend
React (Vite)
TypeScript
Tailwind CSS
ShadCN UI Components
Backend
PHP (REST API)
MySQL
Composer (dependencies)
Other Tools
XAMPP (local development)
Git & GitHub version control

📁 Project Structure
SmartAA-System/
│
├── backend/
│   ├── api/                 # REST API endpoints
│   ├── services/           # Business logic (PDF, validation)
│   ├── assets/             # CSS/JS
│   ├── uploads/            # Uploaded PDF files
│   ├── db_connect.php
│   └── index.html
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # App pages
│   │   ├── lib/            # Utilities & mock data
│   │   └── App.tsx
│   └── public/
│
└── .gitignore

🚀 Setup Instructions
1. Clone Repository
git clone https://github.com/marwanelhennawy/SmartAA-System.git

2. Backend Setup (XAMPP)
Move backend/ to htdocs/
Start Apache + MySQL
Configure database in:
backend/db_connect.php

3. Frontend Setup
cd frontend
npm install
npm run dev

4. Environment Notes
Ensure PHP enabled in XAMPP
Ensure MySQL database is running
Update API base URL in frontend if needed

🧠 Core Modules Explained

📌 Course Recommendation Engine
Implements logic to suggest courses based on:
Completed subjects
Semester structure
Prerequisite rules

📌 Prerequisite Service
Validates course eligibility before submission:
Checks dependency tree
Prevents invalid course selection

📌 PDF Processing Pipeline
Student uploads PDF result slip
Backend extracts content
Data parsed into structured format
Stored in MySQL database

📈 Future Improvements
AI-powered course recommendation system
Mobile application version
Admin analytics dashboard
OCR-based PDF parsing upgrade
Deployment on cloud (AWS / Vercel + PHP backend)

👨‍💻 Author
Marwan Elhennawy
Computer Science Student
Focused on Full-Stack Development & Intelligent Systems

📌 License
This project is for academic and portfolio purposes.