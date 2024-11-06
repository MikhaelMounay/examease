import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import HomeView from "../pages/HomeView";
import CoursesView from "../pages/CoursesView";
import NewCourseView from "../pages/NewCourseView";
import CourseView from "../pages/CourseView";
import MakeExamView from "../pages/MakeExamView";
import ManageStudentsView from "../pages/ManageStudentsView";
import MonitorLiveExams from "../pages/MonitorExamView";
import ViewAllExams from "../pages/AllExamsView";
import RegisterPage from "../pages/RegisterView";
import LoginPage from "../pages/LoginView";
import StudentHomeView from "../pages/StudentHomeView";
import JoinCoursePage from "../pages/JoinCourseView";
import TakeExamPage from "../pages/TakeExamView";
import ViewGradesPage from "../pages/GradesView";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<ProtectedRoute Component={HomeView} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="courses" element={<ProtectedRoute Component={CoursesView} />} />
            <Route path="create-course" element={<ProtectedRoute Component={NewCourseView} />} />
            <Route path="/home" element={<ProtectedRoute Component={HomeView} />} />
            <Route path="/course" element={<ProtectedRoute Component={CourseView} />} />
            <Route path="/make-exam" element={<ProtectedRoute Component={MakeExamView} />} />
            <Route path="/manage-students" element={<ProtectedRoute Component={ManageStudentsView} />} />
            <Route path="/monitor-exams" element={<ProtectedRoute Component={MonitorLiveExams} />} />
            <Route path="/view-exams" element={<ProtectedRoute Component={ViewAllExams} />} />
            <Route path="/student-home" element={<ProtectedRoute Component={StudentHomeView} />} />
            <Route path="/join-course" element={<ProtectedRoute Component={JoinCoursePage} />} />
            <Route path="/take-exam" element={<ProtectedRoute Component={TakeExamPage} />} />
            <Route path="/view-grades" element={<ProtectedRoute Component={ViewGradesPage} />} />
        </Route>
    )
);

export default router;
