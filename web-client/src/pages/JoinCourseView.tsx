import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinCoursePage: React.FC = () => {
    const [enrollmentKey, setEnrollmentKey] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Logic to verify the enrollment key and join the course
        navigate("/course"); // Navigate to course view or other page after successful enrollment
    };

    return (
        <div className="join-course-container">
            <h1>Join a Course</h1>
            <div className="join-course-form">
                <input
                    type="text"
                    placeholder="Enter Enrollment Key"
                    className="join-course-input"
                    value={enrollmentKey}
                    onChange={(e) => setEnrollmentKey(e.target.value)}
                />
                <button onClick={handleSubmit} className="join-course-button">
                    Enroll
                </button>
            </div>
        </div>
    );
};

export default JoinCoursePage;
