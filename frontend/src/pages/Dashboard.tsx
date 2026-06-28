import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusDialog } from "@/components/ui/StatusDialog";

import {
  Upload,
  FileText,
  BookOpen,
  LogOut,
} from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<any>(null);

  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadDialogType, setUploadDialogType] = useState<"success" | "error" | "warning">("success");
  const [uploadDialogTitle, setUploadDialogTitle] = useState("");
  const [uploadDialogDescription, setUploadDialogDescription] = useState("");
  const [uploadDialogDetails, setUploadDialogDetails] = useState<string[]>([]);

  /* =========================
     LOAD DASHBOARD DATA
  ========================= */
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost/SMARTAA-FULLSTACK/backend/api/dashboard.php",
        { credentials: "include" }
      );

      const data = await res.json();

      if (!data.success || !data.student) {
        console.log("Dashboard error:", data);
        setLoading(false);
        return;
      }

      setStudent(data.student);
      setResults(data.semester_results || []);
      setProgress(data.progress || null);

      console.log("Dashboard Progress:", data.progress);

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* =========================
     FILE UPLOAD
     (send to backend PHP)
  ========================= */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost/SMARTAA-FULLSTACK/backend/api/upload.php", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setUploadDialogType("success");
        setUploadDialogTitle("Upload Successful");
        setUploadDialogDescription("Your PDF has been processed and saved.");
        setUploadDialogDetails([
          `File: ${file.name}`,
          "PDF parsed successfully",
          "Database updated (semester_result)",
          "Dashboard refreshed"
        ]);
      } else {
        setUploadDialogType("error");
        setUploadDialogTitle("Upload Failed");
        setUploadDialogDescription(data.message || "Upload error");
        setUploadDialogDetails([]);
      }

      setShowUploadDialog(true);

      // refresh dashboard after upload
      fetchDashboard();

    } catch (err) {
      console.error(err);
      setUploadDialogType("error");
      setUploadDialogTitle("Server Error");
      setUploadDialogDescription("Could not upload file");
      setShowUploadDialog(true);
    }
  };

/* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
    try {
      await fetch("http://localhost/SMARTAA-FULLSTACK/backend/api/logout.php", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("student_id");
    localStorage.removeItem("isAuthenticated");

    navigate("/");
  };

  /* =========================
     HELPERS
  ========================= */
  // Build initials from the student's name (e.g. "Marwan Sameh" -> "MS")
  const getInitials = (name?: string, fallbackId?: string) => {
    if (name && name.trim().length > 0) {
      const parts = name.trim().split(/\s+/);
      const initials = parts.length > 1
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`
        : parts[0].slice(0, 2);
      return initials.toUpperCase();
    }
    return (fallbackId || "ST").slice(0, 2).toUpperCase();
  };

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading dashboard...
      </div>
    );
  }

  const progressPercentage = progress?.progress_percentage ?? 0;
  const requiredCredits = progress?.required_credits ?? 127;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">SmartAA Dashboard</h1>
              <p className="text-sm text-gray-600">Academic System</p>
            </div>
          </div>

          <nav className="flex gap-3 items-center">
            <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
            <Link to="/course-structure"><Button variant="ghost">Course Structure</Button></Link>
            <Link to="/course-planning"><Button variant="ghost">Course Planning</Button></Link>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2"
            >
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">
                  {getInitials(student?.name, student?.student_id)}
                </AvatarFallback>
              </Avatar>
            </button>

            <Button variant="ghost" size="icon" onClick={handleLogout} title="Log out">
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>

        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 py-6">

        {/* STUDENT CARD */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">
                  {student?.name || student?.student_id}
                </CardTitle>
                <CardDescription>
                  {student?.student_id}
                  {student?.programme ? ` • ${student.programme}` : ""}
                </CardDescription>
                {student?.email && (
                  <CardDescription className="mt-0.5">
                    {student.email}
                  </CardDescription>
                )}
              </div>

              {student?.intake_year && (
                <Badge variant="outline" className="shrink-0">
                  Intake {student.intake_year}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">

              <div>
                <div className="text-sm text-gray-500">CGPA</div>
                <div className="text-2xl font-bold">
                  {Number(progress?.cgpa ?? student?.cgpa ?? 0).toFixed(2)}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Total Credits</div>
                <div className="text-2xl font-bold">
                  {progress?.total_credits ?? student?.total_credits ?? 0}
                </div>
                <div className="text-xs text-gray-500">
                  of {requiredCredits} required
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-2xl font-bold">
                  {progress?.progress_percentage ?? 0}%
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Results</div>
                <div className="text-2xl font-bold">{results.length}</div>
              </div>

            </div>

            <Separator className="my-4" />

            <Progress value={progressPercentage} />
          </CardContent>
        </Card>

        {/* UPLOAD */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Semester Results
            </CardTitle>
            <CardDescription>
              Upload your official semester results to update your academic record
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-3">
              <Button onClick={() => document.getElementById("file")?.click()}>
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <span className="text-sm text-gray-500">
                Accepted formats: PDF
              </span>
            </div>

            <input
              id="file"
              type="file"
              className="hidden"
              accept=".pdf,application/pdf"
              onChange={handleFileUpload}
            />
          </CardContent>
        </Card>

        {/* RESULTS TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Courses</CardTitle>
            <CardDescription>
              Your successfully completed courses with grades
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[400px]">

              {results.map((r, i) => (
                <div key={i} className="border p-3 rounded mb-2">

                  <div className="flex justify-between">
                    <div>
                      <div>{r.course_code}</div>
                      <div className="text-sm text-gray-500">{r.course_name}</div>
                    </div>

                    <Badge>{r.grade}</Badge>
                  </div>

                </div>
              ))}

            </ScrollArea>
          </CardContent>
        </Card>

      </div>

      {/* STATUS MODAL */}
      <StatusDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        type={uploadDialogType}
        title={uploadDialogTitle}
        description={uploadDialogDescription}
        details={uploadDialogDetails}
      />

    </div>
  );
}