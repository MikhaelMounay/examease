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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute />}>
                <Route index element={<HomeView />} />
                <Route path="courses" element={<CoursesView />} />
                <Route path="create-course" element={<NewCourseView />} />
                <Route path="/home" element={<HomeView />} />
                <Route path="/course" element={<CourseView />} />
                <Route path="/make-exam" element={<MakeExamView />} />
                <Route path="/manage-students" element={<ManageStudentsView />} />
                <Route path="/monitor-exams" element={<MonitorLiveExams />} />
                <Route path="/view-exams" element={<ViewAllExams />} />
                <Route path="/student-home" element={<StudentHomeView />} />
                <Route path="/join-course" element={<JoinCoursePage />} />
                <Route path="/take-exam" element={<TakeExamPage />} />
                <Route path="/view-grades" element={<ViewGradesPage />} />
                <Route path = "/course/:courseId" element={<CourseView />} />
            </Route>
        </Route>
    )
);

export default router;
