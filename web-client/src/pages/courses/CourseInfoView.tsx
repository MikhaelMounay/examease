import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../../types/Course.ts";
import { useAuth } from "../../contexts/AuthWrapper.tsx";

const CourseInfoPage: React.FC = () => {
    const { courseid } = useParams();
    const [courseInfo, setCourseInfo] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { userData, token } = useAuth();
    const navigate = useNavigate();

    const course = courseInfo;

    // Placeholder for instructor actions
    const teacherFunctions = () => (
        <div className="actions-grid1">
            <button className="action-button1" onClick={() => navigate("/view-exams")}>
                Exams
            </button>
            <button className="action-button1" onClick={() => navigate(`/manage-students/${courseInfo?.id}`)}>
                Manage Enrolled Students
            </button>
            <button className="action-button1" onClick={() => navigate("/monitor-exams")}>
                Monitor Live Exams
            </button>
            <button className="action-button1" onClick={() => navigate(`/edit-course/${courseInfo?.id}`)}>
                Edit Course Properties
            </button>
            <button className="action-button1" onClick={() => navigate(`/make-exam`)}>
                Create Exam
            </button>
        </div>
    );

    // Placeholder for student actions
    const studentFunctions = () => (
        <div className="actions-grid1">
            <button className="action-button1" onClick={() => navigate("/take-exam")}>
                Take an Exam
            </button>
            <button className="action-button1" onClick={() => navigate("/view-grades")}>
                View Grades & Feedback
            </button>
        </div>
    );

    useEffect(() => {
        console.log("Course ID from URL:", courseid);

        const fetchCourseInfo = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseid}`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch course data");

                const data = await response.json();
                console.log("Fetched course data:", data);

                setCourseInfo(data);
            } catch (err) {
                console.error("Error fetching course data:", err);
                setError("Failed to load course information");
            } finally {
                setLoading(false);
            }
        };

        if (courseid) {
            fetchCourseInfo();
        } else {
            setError("Invalid course ID");
            setLoading(false);
        }
    }, [courseid]);

    if (loading) return <p>Loading course information...</p>;
    if (error) return <p>{error}</p>;

    if (!courseInfo) return <p>No course data available.</p>;
    return (
        <div>
            <div className="course-info-container">
                <h1>Course Info: {courseInfo.title}</h1>
                <p>
                    <strong>Course ID:</strong> {courseInfo.id}
                </p>
                <p>
                    <strong>Instructor ID :</strong> {courseInfo.instructorId}
                </p>
                <p>
                    <strong>Available Places :</strong> {courseInfo.numStudents}
                </p>
                <p>
                    <strong>Enrollment Code:</strong> {courseInfo.enrollmentKey}
                </p>
            </div>
            <div className="course-view-container">
                <h1>{course ? course?.title : "Loading Course..."}</h1>
                <h2>Select an action for this course</h2>

                {userData?.role === "INSTRUCTOR" ? teacherFunctions() : studentFunctions()}
            </div>
        </div>
    );
};

export default CourseInfoPage;
