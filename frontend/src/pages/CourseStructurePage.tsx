import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { BookOpen, ArrowLeft, CheckCircle, Clock, Circle, Info } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Course = {
  course_id: number;
  code: string;
  name: string;
  credits: number;
  status: "completed" | "in-progress" | "not-taken";

  prerequisites?: {
    courses: string[];
    min_credits: number | null;
    min_cgpa: number | null;
  };
};

type SemesterBlock = {
  year: number;
  semester: number;
  courses: Course[];
};

/* =========================
   STATIC COURSE NOTES
   (brief, course-specific footnotes from the curriculum doc —
    independent of prerequisite logic)
========================= */
const COURSE_NOTES: Record<string, string> = {
  UHMS1182: "Malaysian students only",
  UHLM1012: "International students only",
  SECJ3104: "Choose from elective list",
  SXXXXXX3: "Free elective — choose from a faculty other than Computing",
  SECH5XX3: "PRISMS elective — see academic advisor for eligibility",
  SECD5XX3: "PRISMS elective — see academic advisor for eligibility",
};

export function CourseStructurePage() {
  const navigate = useNavigate();

  const [structure, setStructure] = useState<SemesterBlock[]>([]);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("student_id");

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await fetch(
          `http://localhost/SMARTAA-FULLSTACK/backend/api/course_structure.php?student_id=${studentId}`
        );

        const data = await res.json();
        setStructure(data);
      } catch (err) {
        console.error("Failed to load course structure", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStructure();
  }, [studentId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "in-progress":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-600">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Taken</Badge>;
    }
  };

  // Builds one compact, muted prerequisite line (no red, stays readable)
  const getPrerequisiteLine = (course: Course): string | null => {
    const prereqs = course.prerequisites;
    if (!prereqs) return null;

    const parts: string[] = [];

    if (prereqs.courses && prereqs.courses.length > 0) {
      parts.push(`Prerequisites: ${prereqs.courses.join(", ")}`);
    }

    if (prereqs.min_credits !== null && prereqs.min_credits !== undefined) {
      parts.push(`Min. ${prereqs.min_credits} credits`);
    }

    if (prereqs.min_cgpa !== null && prereqs.min_cgpa !== undefined) {
      parts.push(`Min. CGPA ${prereqs.min_cgpa}`);
    }

    return parts.length > 0 ? parts.join(" • ") : null;
  };

  if (loading) {
    return <div className="p-10 text-center">Loading course structure...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER (UNCHANGED UI) */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl">SmartAA Student Dashboard</h1>
              <p className="text-sm text-gray-600">Academic Progress Tracking System</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>

            <Link to="/course-structure">
              <Button variant="ghost">Course Structure</Button>
            </Link>

            <Link to="/course-planning">
              <Button variant="ghost">Course Planning</Button>
            </Link>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-full"
            >
              <Avatar className="h-9 w-9 ring-2 ring-gray-200">
                <AvatarFallback className="bg-blue-600 text-white">
                  MS
                </AvatarFallback>
              </Avatar>
            </button>
          </nav>
        </div>
      </div>

      {/* BODY */}
      <div className="container mx-auto px-4 py-6">

        <div className="mb-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Official Programme Structure</CardTitle>
            <CardDescription>
              Based on your intake + programme (database driven)
            </CardDescription>
          </CardHeader>
        </Card>

        {/* SEMESTERS */}
        <div className="space-y-6">

          {structure.map((sem, index) => {
            const totalCredits = sem.courses.reduce((s, c) => s + c.credits, 0);

            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>
                    Year {sem.year} - Semester {sem.semester}
                  </CardTitle>
                  <CardDescription>
                    {sem.courses.length} courses • {totalCredits} credits
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">

                    {sem.courses.map((course) => {

                      const prereqLine = getPrerequisiteLine(course);
                      const note = COURSE_NOTES[course.code];

                      return (
                        <div
                          key={course.course_id}
                          className={`flex justify-between rounded-lg border p-4 ${getStatusColor(course.status)}`}
                        >
                          <div className="flex gap-3">
                            {getStatusIcon(course.status)}

                            <div>
                              <div className="font-medium">{course.code}</div>
                              <div className="text-sm text-gray-600">{course.name}</div>
                              <div className="text-xs text-gray-500">{course.credits} credits</div>

                              {prereqLine && (
                                <div className="flex items-start gap-1 text-xs text-gray-500 mt-1">
                                  <Info className="h-3 w-3 mt-0.5 shrink-0" />
                                  <span>{prereqLine}</span>
                                </div>
                              )}

                              {note && (
                                <div className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1 mt-1.5">
                                  {note}
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            {getStatusBadge(course.status)}
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </CardContent>
              </Card>
            );
          })}

        </div>
      </div>
    </div>
  );
}