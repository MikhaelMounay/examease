import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import NavigationGuard from "../components/auth/NavigationGuard.tsx";
import App from "../App";
import HomeView from "../pages/HomeView";
import CoursesView from "../pages/CoursesView";
import NewCourseView from "../pages/NewCourseView";
import MakeExamView from "../pages/MakeExamView";
import ManageStudentsView from "../pages/ManageStudentsView";
import MonitorLiveExams from "../pages/MonitorExamView";
import ViewAllExams from "../pages/AllExamsView";
import RegisterPage from "../pages/RegisterView";
import LoginPage from "../pages/LoginView";
import StudentHomeView from "../pages/StudentHomeView";
import JoinCourseView from "../pages/JoinCourseView";
import TakeExamPage from "../pages/TakeExamView";
import ViewGradesPage from "../pages/GradesView";
import AddStudent from "../pages/AddStudent";
import RemoveStudent from "../pages/RemoveStudent";
import ViewStudentsInfo from "../pages/ViewStudentsInfo";
import CourseViewWithInfo from "../pages/CourseInfoView";

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
                <Route path="/manage-students" element={<ManageStudentsView />} />
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
