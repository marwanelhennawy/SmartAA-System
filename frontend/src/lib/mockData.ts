export interface Course {
  code: string;
  name: string;
  credits: number;
  grade?: string;
  status: 'completed' | 'in-progress' | 'not-taken' | 'available';
  semester?: number;
  year?: number;   
}

export interface Semester {
  year: number;
  semester: number;
  courses: Course[];
}

export const mockStudent = {
  name: "Marwan Sameh",
  matricNumber: "A123456",
  programme: "Software Engineering",
  intakeYear: 2023,
  cgpa: 3.5,
  totalCredits: 60,
};

export const completedCourses: Course[] = [
  { code: "SECJ1013", name: "Programming Technique I", credits: 3, grade: "A", status: "completed" },
  { code: "SECI1113", name: "Computational Mathematics", credits: 3, grade: "B+", status: "completed" },
  { code: "SECR1013", name: "Digital Logic", credits: 3, grade: "A-", status: "completed" },
];

export const inProgressCourses: Course[] = [
  { code: "SECJ1023", name: "Programming Technique II", credits: 3, status: "in-progress" },
  { code: "SECD2523", name: "Database", credits: 3, status: "in-progress" },
  { code: "SECR2213", name: "Network Communications", credits: 3, status: "in-progress" },
];


export const courseStructure: Semester[] = [
  {
    year: 1,
    semester: 1,
    courses: [
      { code: "SECI1143", name: "Probability & Statistical Data Analysis", credits: 3, status: "completed" },
      { code: "SECJ1013", name: "Programming Technique I", credits: 3, status: "completed" },
      { code: "SECR1013", name: "Digital Logic", credits: 3, status: "completed" },
      { code: "SECI1113", name: "Computational Mathematics", credits: 3, status: "completed" },
      { code: "SECD2613", name: "System Analysis and Design", credits: 3, status: "completed" },
    ],
  },
  {
    year: 1,
    semester: 2,
    courses: [
      { code: "SECR2213", name: "Network Communications", credits: 3, status: "in-progress" },
      { code: "SECD2523", name: "Database", credits: 3, status: "in-progress" },
      { code: "SECJ1023", name: "Programming Technique II", credits: 3, status: "in-progress" },
      { code: "SECJ2203", name: "Software Engineering", credits: 3, status: "not-taken" },
    ],
  },
  {
    year: 2,
    semester: 1,
    courses: [
      { code: "SECJ2013", name: "Data Structure and Algorithm", credits: 3, status: "not-taken" },
      { code: "SECR1033", name: "Computer Organisation and Architecture", credits: 3, status: "not-taken" },
    ],
  },

  // ✅ ADD HERE (inside array)
  {
    year: 4,
    semester: 7,
    courses: [
      { code: "SECJ4513", name: "Final Year Project I", credits: 3, status: "available", semester: 7 },
      { code: "SECJ4523", name: "Software Quality", credits: 3, status: "available", semester: 7 },
    ],
  },
  {
    year: 4,
    semester: 8,
    courses: [
      { code: "SECJ4613", name: "Final Year Project II", credits: 3, status: "available", semester: 8 },
      { code: "SECJ4623", name: "Professional Practice", credits: 3, status: "available", semester: 8 },
    ],
  }
];

export const availableElectives: Course[] = [
  { code: "ELEC4013", name: "Machine Learning", credits: 3, status: "available", semester: 7 },
  { code: "ELEC4023", name: "Cybersecurity", credits: 3, status: "available", semester: 7 },
  { code: "ELEC4033", name: "Mobile App Development", credits: 3, status: "available" , semester: 7},
];