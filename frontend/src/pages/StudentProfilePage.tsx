import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  TrendingUp
} from "lucide-react";

const API_URL = "http://localhost/SMARTAA-FULLSTACK/backend/api";

export function StudentProfilePage() {
  const [student, setStudent] = useState<any>(null);
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    campus: ""
  });

  useEffect(() => {
    fetch(`${API_URL}/profile.php`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStudent(data.student);
          setUploads(data.uploads);

          setForm({
            name: data.student.name || "",
            email: data.student.email || "",
            phone: data.student.phone || "",
            campus: data.student.campus || ""
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = async () => {
    const res = await fetch(`${API_URL}/update_profile.php`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("Profile updated successfully");
      setEditMode(false);
    } else {
      alert("Update failed");
    }
  };

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!student) {
    return <div className="p-6">No student data found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">SmartAA Student Dashboard</h1>
              <p className="text-sm text-gray-600">Academic Progress Tracking System</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/course-structure">
              <Button variant="ghost">Course Structure</Button>
            </Link>
            <Link to="/course-planning">
              <Button variant="ghost">Course Planning</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 py-6 grid gap-6 lg:grid-cols-3">

        {/* LEFT PROFILE */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {student.name?.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <CardTitle className="text-2xl">{student.name}</CardTitle>
            <CardDescription>{student.student_id}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* PROGRAMME */}
            <div className="rounded-lg bg-blue-50 p-4">
              <GraduationCap className="h-4 w-4 inline mr-2" />
              {student.programme || "Not set"}
            </div>

            {/* CGPA + CREDITS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border p-3 rounded">
                <Award className="h-4 w-4" />
                <div className="text-xl">{student.cgpa}</div>
              </div>

              <div className="border p-3 rounded">
                <TrendingUp className="h-4 w-4" />
                <div className="text-xl">{student.total_credits}</div>
              </div>
            </div>

            <Separator />

            {/* EDIT PROFILE */}
            {!editMode ? (
              <Button className="w-full" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Campus"
                  value={form.campus}
                  onChange={e => setForm({ ...form, campus: e.target.value })}
                />

                <div className="flex gap-2">
                  <Button onClick={updateProfile} className="w-full">
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* INFO CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Student Info</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">

              <div><Mail className="inline mr-2" /> {student.email}</div>
              <div><Phone className="inline mr-2" /> {student.phone || "Not set"}</div>
              <div><MapPin className="inline mr-2" /> {student.campus || "Not set"}</div>
              <div><Calendar className="inline mr-2" /> Intake: {student.intake_year} ({student.intake_month})</div>

            </CardContent>
          </Card>

          {/* UPLOAD HISTORY */}
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[300px]">
                {uploads.length > 0 ? (
                  uploads.map((u, i) => (
                    <div key={i} className="border p-3 mb-2 rounded">
                      <div className="font-medium text-sm truncate">
                        {u.file_name || "Unknown file"}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {u.semester ? `Semester ${u.semester}` : "Semester: —"}
                        {u.session ? ` • ${u.session}` : ""}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Uploaded: {u.upload_date}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 text-center py-8">
                    No uploads yet
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}