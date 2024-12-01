import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { Exam } from "../../types/Exam.ts"; // Import the correct type for exams
import { useCourseContext } from "../../contexts/CourseContext.tsx"; // Access course context
import { useAuth } from "../../contexts/AuthWrapper.tsx"; // Access authentication context

const ExamsView: React.FC = () => {
    const { courseData } = useCourseContext(); // Get course data from context
    const { token } = useAuth(); // Get the token from auth context
    const navigate = useNavigate();

    // Fetch exams based on courseId
    const fetchExams = async (courseId: number, token: string): Promise<Exam[]> => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/exams/course/${courseId}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch exams for this course.");
        return response.json();
    };

    // Use `useQuery` to fetch exams for the current course
    const {
        data: exams,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["exams", courseData?.id], // Using the course ID as part of the query key
        queryFn: () => {
            // Check if courseData?.id is defined before making the API request
            if (courseData?.id) {
                return fetchExams(courseData.id, token || ""); // Fetch exams for the specific course
            } else {
                return []; // Return an empty array if courseData.id is undefined
            }
        },
        enabled: !!courseData?.id && !!token, // Enable the query only if courseId and token are available
    });

    // Handle loading and error states
    if (isLoading) return <p>Loading exams...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    const handleCreateExam = () => {
        navigate("/make-exam");
    };

    return (
        <div className="exam-view-container">
            <h1>Exams for {courseData?.title}</h1>
            <div className="exam-list">
                {exams && exams.length > 0 ? (
                    exams.map((exam: Exam) => (
                        <div key={exam.id} className="exam-card">
                            <button
                                className="exam-card-button"
                                onClick={() => navigate(`/exam-info/${exam.id}`)} // Navigate to exam details
                            >
                                <h2>{exam.title}</h2>
                                <p>Max Grade: {exam.maxGrade}</p>
                                {/* <p>Created At: {new Date(exam.createdAt).toLocaleDateString()}</p> */}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No exams created for this course yet.</p>
                )}
            </div>
            <button className="create-exam-button" onClick={handleCreateExam}>
                <FontAwesomeIcon icon={faPlus} className="create-exam-icon" />
                Create Exam
            </button>
        </div>
    );
};

export default ExamsView;
