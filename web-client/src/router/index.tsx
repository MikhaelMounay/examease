import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import HomeView from "../pages/HomeView";
import CoursesView from "../pages/CoursesView";
import NewCourseView from "../pages/NewCourseView";
import CourseView from "../pages/CourseView";
import MakeExamView from "../pages/MakeExamView";
import ManageStudentsView from "../pages/ManageStudentsView";
import MonitorLiveExams from "../pages/MonitorExamView";
import ViewAllExams from "../pages/AllExamsView";


const router = createBrowserRouter(createRoutesFromElements(
<Route path="/" element={<App />}>
    <Route index element={<HomeView />} />
<Route path="courses" element={<CoursesView/>} />
<Route path="create-course" element={<NewCourseView/>} />
<Route path = "/home" element = {<HomeView/>} />
<Route path = "/course" element = {<CourseView/>} />
<Route path = "/make-exam" element = {<MakeExamView/>} />
<Route path = "/manage-students" element = {<ManageStudentsView/>} />
<Route path = "/monitor-exams" element = {<MonitorLiveExams/>} />
<Route path = "/view-exams" element = {<ViewAllExams/>} />
</Route>
));

export default router;
