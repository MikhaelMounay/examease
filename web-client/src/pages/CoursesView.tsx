import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Course } from "../types/Course";
import { AuthData } from "../contexts/AuthWrapper";
import { Link } from "react-router-dom";


const CoursesView: React.FC = () => {
    const { userData, token } = AuthData();
    const fetchCourses = async (): Promise<Course[]> => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch courses.");
        }
        
        return response.json();
    };

    const { data: courses, error, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load courses. Please try again later.</p>;

    return (
        <div className="course-view-container">
            <h1 className="greeting">All Courses For {userData?.name}</h1>
            <div className="course-list">
                {courses && courses.length > 0 ? (
                    courses.map((course) => (
                        course.instructorId === Number(userData?.id)  && (
                            <div key={course.id} className="course-card">
                                {/* <p> course {course.instructorId}</p> */}
                                <Link to={`/course/${course.id}`}>
                                <div className="course-details">
                                    <span>{course.title}</span>
                                </div>
                                </Link>
                                
                            </div>
                        )
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default CoursesView;
