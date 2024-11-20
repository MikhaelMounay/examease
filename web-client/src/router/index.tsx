import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import NavigationGuard from "../components/auth/NavigationGuard.tsx";
import App from "../App";
import HomeView from "../pages/HomeView";
import CoursesView from "../pages/courses/CoursesView.tsx";
import NewCourseView from "../pages/courses/instructor/NewCourseView.tsx";
import MakeExamView from "../pages/exams/instructor/MakeExamView.tsx";
import ManageStudentsView from "../pages/courses/instructor/ManageStudentsView.tsx";
import MonitorLiveExams from "../pages/exams/instructor/MonitorExamView.tsx";
import ViewAllExams from "../pages/exams/AllExamsView.tsx";
import RegisterPage from "../pages/auth/RegisterView.tsx";
import LoginPage from "../pages/auth/LoginView.tsx";
import StudentHomeView from "../pages/StudentHomeView";
import JoinCourseView from "../pages/courses/student/JoinCourseView.tsx";
import TakeExamPage from "../pages/exams/student/TakeExamView.tsx";
import ViewGradesPage from "../pages/GradesView";
import AddStudent from "../pages/courses/instructor/AddStudent.tsx";
import RemoveStudent from "../pages/courses/instructor/RemoveStudent.tsx";
import ViewStudentsInfo from "../pages/ViewStudentsInfo";
import CourseViewWithInfo from "../pages/courses/CourseInfoView.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<NavigationGuard />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route index element={<HomeView />} />
                <Route path="courses" element={<CoursesView />} />
                <Route path="create-course" element={<NewCourseView />} />
                <Route path="/home" element={<HomeView />} />
                <Route path="/make-exam" element={<MakeExamView />} />
                <Route path="/manage-students/:courseId" element={<ManageStudentsView />} />
                <Route path="/monitor-exams" element={<MonitorLiveExams />} />
                <Route path="/view-exams" element={<ViewAllExams />} />
                <Route path="/student-home" element={<StudentHomeView />} />
                <Route path="/join-course" element={<JoinCourseView />} />
                <Route path="/take-exam" element={<TakeExamPage />} />
                <Route path="/view-grades" element={<ViewGradesPage />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/remove-student" element={<RemoveStudent />} />
                <Route path="/view-students-info" element={<ViewStudentsInfo />} />
                <Route path="/course-info/:courseid" element={<CourseViewWithInfo />} />
            </Route>
        </Route>
    )
);

export default router;
