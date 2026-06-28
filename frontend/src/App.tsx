import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { StudentProfilePage } from "./pages/StudentProfilePage";
import { CourseStructurePage } from "./pages/CourseStructurePage";
import { CoursePlanningPage } from "./pages/CoursePlanningPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<StudentProfilePage />} />
        <Route path="/course-structure" element={<CourseStructurePage />} />
        <Route path="/course-planning" element={<CoursePlanningPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;