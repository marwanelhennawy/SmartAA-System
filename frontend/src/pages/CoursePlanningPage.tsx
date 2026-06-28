import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { StatusDialog } from "@/components/ui/StatusDialog";
import { BookOpen, ArrowLeft, Calendar, Send, Plus, Trash2, Search, FileText } from "lucide-react";

type Course = {
  course_id: number;
  code: string;
  name: string;
  credits: number;
  eligible: boolean;
  completed: boolean;
  semester: number;
  year: number;
};

export function CoursePlanningPage() {
  const [confirmStep, setConfirmStep] = useState<
  "none" | "retake" | "retake-final"
>("none");
  const [pendingCourse, setPendingCourse] = useState<Course | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCourseData, setSelectedCourseData] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const studentId = localStorage.getItem("student_id");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [submitDialogType, setSubmitDialogType] = useState<'success' | 'error' | 'warning'>('success');
  const [submitDialogTitle, setSubmitDialogTitle] = useState('');
  const [submitDialogDescription, setSubmitDialogDescription] = useState('');
const [submitDialogDetails, setSubmitDialogDetails] = useState<string[]>([]);


  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [searchResults, setSearchResults] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost/SMARTAA-FULLSTACK/backend/api/course_recommendation.php?student_id=${studentId}`
        );
        const data = await response.json();
        setAvailableCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    if (studentId) {
      loadCourses();
    }
  }, [studentId]);

const handleRetakeProceed = () => {
  if (!pendingCourse) return;

  setConfirmStep("retake-final");

  setSubmitDialogType("warning");
  setSubmitDialogTitle("Are You Sure?");
  setSubmitDialogDescription(
    `Confirm again: retake ${pendingCourse.code}?`
  );

  setSubmitDialogDetails([
    "This action will update your course selection.",
    "This cannot be automatically reversed."
  ]);

  setShowSubmitDialog(true);
};  

const handleRetakeFinalConfirm = () => {
  if (!pendingCourse) return;

  setSelectedCourses((prev) => [...prev, pendingCourse.code]);
  setSelectedCourseData((prev) => [...prev, pendingCourse]);

  setPendingCourse(null);
  setConfirmStep("none");
  setShowSubmitDialog(false);
};

const toggleCourse = (courseCode: string) => {
  const course = safeCourses.find((c) => c.code === courseCode);
  if (!course) return;

  const isSelected = selectedCourses.includes(courseCode);

  // If already selected → remove
  if (isSelected) {
    setSelectedCourses((prev) => prev.filter((c) => c !== courseCode));
    setSelectedCourseData((prev) => prev.filter((c) => c.code !== courseCode));
    return;
  }

  // RETAKE CONFIRMATION
if (course.completed) {
  setPendingCourse(course);

  setConfirmStep("retake");

  setSubmitDialogType("warning");
  setSubmitDialogTitle("Retake Course Confirmation");
  setSubmitDialogDescription(
    `You have already passed ${course.code} : ${course.name}. Do you want to retake this course?`
  );

  setSubmitDialogDetails([
    "Retaking may replace previous grade depending on policy.",
    "Check with academic advisor before retaking."
  ]);

  setShowSubmitDialog(true);
  return;
}

// BLOCK IF NOT ELIGIBLE
if (!course.eligible) {

  setSubmitDialogType("error");
  setSubmitDialogTitle("Course Locked");
  setSubmitDialogDescription(
    `${course.code} cannot be selected yet.`
  );

  setSubmitDialogDetails([
    "Prerequisites not completed.",
    "Complete required courses before enrolling.",
    "You can view prerequisite info in course structure."
  ]);

  setShowSubmitDialog(true);
  return;
}

// NORMAL ADD
setSelectedCourses((prev) => [...prev, courseCode]);
setSelectedCourseData((prev) => [...prev, course]);
};



const allCourses = [...availableCourses, ...searchResults];

const uniqueCoursesMap = new Map(
  allCourses.map((c) => [c.code, c])
);

const safeCourses: Course[] = Array.from(uniqueCoursesMap.values());

console.log("availableCourses", availableCourses);
console.log("searchResults", searchResults);
console.log("selectedCourses", selectedCourses);
console.log("allCourses", allCourses);

const selectedCredits = selectedCourseData.reduce(
  (sum, course) => sum + (course.credits || 0),
  0
);

  const getCourseName = (code: string) => {
  const course = safeCourses.find((c) => c.code === code);
  return course ? course.name : "Unknown Course";
};

  const handleSubmitPlan = async () => {
  if (selectedCourses.length === 0) {
    setSubmitDialogType("warning");
    setSubmitDialogTitle("No Courses Selected");
    setSubmitDialogDescription("Please select at least one course before submitting your plan.");
    setShowSubmitDialog(true);
    return;
  }

console.log("Submitting:", {
  student_id: studentId,
  courses: selectedCourses,
  credits: selectedCredits
});

  try {
    const response = await fetch(
      "http://localhost/SMARTAA-FULLSTACK/backend/api/submit_course_plan.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        student_id: studentId,
        courses: selectedCourses,
        credits: selectedCredits
      }),
      }
    );

    const text = await response.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch (err) {
    console.error("Backend did not return JSON:", text);
    throw new Error("Invalid server response");
  }
   if (result.success) {
      setSubmitDialogType("success");
      setSubmitDialogTitle("Course Plan Submitted");
      setSubmitDialogDescription("Your course selection has been saved for review.");
      setSubmitDialogDetails([
        `Total courses selected: ${selectedCourses.length}`,
        `Total credits: ${selectedCredits}`,
        "Status: Pending academic advisor approval",
        "Expected review time: 2-3 business days",
      ]);

      setSelectedCourses([]);
      setSelectedCourseData([]);
} else {
  setSubmitDialogType("error");
  setSubmitDialogTitle("Course Plan Rejected");

  const missing = Array.isArray(result.errors)
  ? result.errors
  : [];

const formattedMissing =
  missing.length > 0
    ? missing.map((code: string) => {
        const name = getCourseName(code);
        return `${code} - ${name}`;
      })
    : [];

// get first selected course (or you can loop later)
// match the course that actually failed, fall back to first if missing
const blockedCourse = selectedCourseData.find(
  (c) => c.code === result.blocked_course
) || selectedCourseData[0];

const blockedCourseText = blockedCourse
  ? `${blockedCourse.code} - ${blockedCourse.name}`
  : "Selected course";

setSubmitDialogDescription(
  `${blockedCourseText} cannot be taken due to unmet prerequisites.`
);

setSubmitDialogDetails(
  formattedMissing.length > 0
    ? [
        "Missing prerequisite course(s):",
        ...formattedMissing
      ]
    : [
        "One or more selected courses cannot be taken yet.",
        "Complete required prerequisite courses first."
      ]
);
}
    setShowSubmitDialog(true);
  } catch (error) {
    console.error(error);

    setSubmitDialogType("error");
    setSubmitDialogTitle("Server Error");
    setSubmitDialogDescription("Unable to submit course plan.");
    setShowSubmitDialog(true);
  }
};

  useEffect(() => {
    if (!studentId) return;
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost/SMARTAA-FULLSTACK/backend/api/search_courses.php?student_id=${studentId}&search=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, studentId]);

  const groupedCourses = safeCourses.reduce<Record<string, Course[]>>((acc, course) => {
    const key = `Year ${course.year || 0} Semester ${course.semester || 0}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {});

  const groupedEntries = Object.entries(groupedCourses);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">SmartAA Student Dashboard</h1>
                <p className="text-sm text-gray-600">Academic Progress Tracking System</p>
              </div>
            </div>
            <nav className="flex gap-4">
              <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
              <Link to="/course-structure"><Button variant="ghost">Course Structure</Button></Link>
              <Link to="/course-planning"><Button variant="ghost">Course Planning</Button></Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search courses by code or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <div className="text-sm text-gray-600">
                  {searchResults.length > 0
                    ? `Found ${searchResults.length} course(s) matching "${searchQuery}"`
                    : `No courses found matching "${searchQuery}"`}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {searchQuery.trim() !== "" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Courses from the full programme structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {searchResults.map((course) => (
                  <div key={course.code} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <div className="font-medium">{course.code}</div>
                      <div className="text-sm text-gray-500">{course.name}</div>
                      <div className="text-xs text-gray-400">Year {course.year} Semester {course.semester}</div>
                    </div>
                    <Badge>{course.credits} Credits</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Plan Your Next Semester
                </CardTitle>
                <CardDescription>Select courses for the upcoming semester and submit for academic review</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {groupedEntries.map(([groupName, courses]) => (
                      <div key={groupName}>
                        <h3 className="mb-3 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{groupName}</Badge>
                        </h3>
                        <div className="space-y-2">
                          {courses.length > 0 ? (
                            courses.map((course: Course) => (
                              <div
                                key={course.code}
                                className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                                  selectedCourses.includes(course.code) ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                                }`}
                              >
                                <Checkbox
                                  id={course.code}
                                  checked={selectedCourses.includes(course.code)}
                                  onCheckedChange={() => toggleCourse(course.code)}
                                />
                                <label htmlFor={course.code} className="flex flex-1 cursor-pointer flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span>{course.code}</span>
                                    {!course.eligible && (
                                      <Badge variant="destructive" className="cursor-help">
                                        Locked
                                      </Badge>
                                    )}
                                    <Badge variant="secondary" className="text-xs">{course.credits} credits</Badge>
                                    {course.completed && <Badge variant="secondary">Passed</Badge>}
                                  </div>
                                  <div className="text-sm text-gray-600">{course.name}</div>
                                        {!course.eligible && (
                                          <div className="text-xs text-red-500 mt-1">
                                            Prerequisites not satisfied
                                          </div>
                                        )}
                                </label>
                              </div>
                            ))
                          ) : (
                            <div className="rounded-lg border border-dashed p-6 text-sm text-gray-500">No courses in this section</div>
                          )}
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Selection Summary</CardTitle>
                <CardDescription>Review your course selection before submitting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-gray-50 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Courses Selected</span>
                        <span>{selectedCourses.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Credits</span>
                        <span className={selectedCredits > 18 || (selectedCredits > 0 && selectedCredits < 12) ? 'text-red-600' : ''}>
                          {selectedCredits}
                        </span>
                      </div>
                      <Separator />
                      <div className="text-xs text-gray-500">Recommended: 12-18 credits per semester</div>
                    </div>
                  </div>

                  {selectedCourses.length > 0 ? (
                    <div>
                      <div className="mb-2 text-sm">Selected Courses:</div>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                          {selectedCourseData.map((course) => (
                            <div
                              key={course.code}
                              className="flex items-start justify-between gap-2 rounded border p-2 text-sm"
                            >
                              <div className="flex-1">
                                <div>{course.code}</div>
                                <div className="text-xs text-gray-600">
                                  {course.name}
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => toggleCourse(course.code)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <Plus className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-600">No courses selected yet</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button className="w-full gap-2" onClick={handleSubmitPlan} disabled={selectedCourses.length === 0}>
                      <Send className="h-4 w-4" /> Submit for Review
                    </Button>
                    {selectedCourses.length > 0 && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedCourses([]);
                          setSelectedCourseData([]);
                        }}
                      >
                        Clear Selection
                      </Button>
                    )}
                  </div>

                     <div className="rounded-lg border bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      Guidelines:
                    </div>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Select 12-18 credits per semester</li>
                      <li>• Check prerequisites before selecting</li>
                      <li>• Plans are subject to advisor approval</li>
                      <li>• Review takes 2-3 business days</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
     <StatusDialog
  open={showSubmitDialog}
  onOpenChange={(open) => {
    setShowSubmitDialog(open);
    if (!open) {
      setConfirmStep("none");
      setPendingCourse(null);
      setConfirmStep("none");
    }
  }}
  type={submitDialogType}
  title={submitDialogTitle}
  description={submitDialogDescription}
  details={submitDialogDetails}
  showConfirm={confirmStep === "retake" || confirmStep === "retake-final"}
  confirmText={
    confirmStep === "retake"
      ? "Yes"
      : "Are You Sure?"
  }
  onConfirm={
    confirmStep === "retake"
      ? handleRetakeProceed
      : handleRetakeFinalConfirm
  }
/>
    </div>
  );
}