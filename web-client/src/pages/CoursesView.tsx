// components/CoursesView.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Course } from "../types/Course";
import { useCourseContext } from "../contexts/CourseContext";
import { useAuth } from "../contexts/AuthWrapper";

const CoursesView: React.FC = () => {
    const { setCourseData } = useCourseContext();
    const { userData, token } = useAuth();
    const navigate = useNavigate();

    const fetchCourses = async (): Promise<Course[]> => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/instructor/${userData?.id}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch courses.");
        return response.json();
    };

    // Use `useQuery` with instructor-specific fetch
    const {
        data: courses,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["courses", userData?.aucId],
        queryFn: fetchCourses,
        enabled: !!userData?.aucId && !!token,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load courses. Please try again later.</p>;

    return (
        <div className="course-view-container">
            <h1>All Courses for {userData?.name}</h1>
            <div className="course-list">
                {courses && courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <button
                                onClick={() => {
                                    setCourseData(course); // Set selected course data
                                    console.log("Course data set:", course);
                                    navigate(`/course-info/${course.id}`);
                                }}
                            >
                                {course.title}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default CoursesView;
