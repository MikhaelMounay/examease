import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Course } from "../types/Course";
import { AuthData } from "../contexts/AuthWrapper";

const CoursesView: React.FC = () => {
    const { token, userData } = AuthData();

    // Define the fetch function to get courses
    const fetchCourses = async (): Promise<Course[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/instructor/${userData?.id}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    
        if (!response.ok) {
            const errorDetails = await response.text();
            console.error("Failed to fetch courses:", response.status, errorDetails);
            throw new Error("Failed to fetch courses.");
        }
    
        return response.json();
    };
    
    
    // Use `useQuery` to fetch courses
    const { data: courses, error, isLoading } = useQuery({
        queryKey: ["courses", userData?.aucId],
        queryFn: fetchCourses,
        enabled: !!userData?.aucId && !!token, 
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load courses. Please try again later.</p>;

    return (
        <div className="course-view-container">
            <h1 className="greeting">Your Courses</h1>
            <div className="course-list">
                {courses && courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <div className="course-details">
                                <Link to={`/course/${course.id}`} className="button">
                                    {course.title}
                                </Link>
                            </div>
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
