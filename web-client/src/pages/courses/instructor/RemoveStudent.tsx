import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RemoveStudent: React.FC = () => {
    const navigate = useNavigate();
    const { courseId } = useParams(); // Get the course ID from the URL params
    const [aucId, setAucId] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAucId(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        // Validate the AUC ID format
        if (!aucId.match(/^\d+$/)) {
            setError("AUC ID must contain only numeric values.");
            return;
        }

        if (aucId.length !== 9) {
            setError("AUC ID must be exactly 9 digits long.");
            return;
        }

        try {
            // Check if the student exists
            const response = await fetch(`/api/students/${aucId}`);
            const data = await response.json();

            if (!response.ok || !data.exists) {
                setError("Student with this AUC ID does not exist.");
                return;
            }

            // Check if the student is enrolled in the course
            const courseResponse = await fetch(`/api/courses/${courseId}/students/${aucId}`);
            const courseData = await courseResponse.json();

            if (!courseResponse.ok || !courseData.isEnrolled) {
                setError("Student is not enrolled in this course.");
                return;
            }

            // Remove the student from the course
            const removeStudentResponse = await fetch(`/api/courses/${courseId}/students`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ aucId }),
            });

            if (removeStudentResponse.ok) {
                setSuccessMessage(`Student with AUC ID ${aucId} has been removed from the course.`);
                setAucId(""); // Reset the input field
            } else {
                setError("Failed to remove student from the course. Please try again.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("An error occurred while removing the student. Please try again.");
        }
    };

    return (
        <div className="remove-student-container">
            <h1>Remove Student from Course</h1>
            <form onSubmit={handleFormSubmit} className="remove-student-form">
                <label htmlFor="aucId">AUC ID:</label>
                <input
                    type="text"
                    id="aucId"
                    value={aucId}
                    onChange={handleInputChange}
                    placeholder="Enter AUC ID"
                    required
                />
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="submit-button">
                    Remove Student
                </button>
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate(`/manage-students`)} // Navigate to Manage Students View
                >
                    Back
                </button>
            </form>
        </div>
    );
};

export default RemoveStudent;
