import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddStudent: React.FC = () => {
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
            // Add the student to the course
            const addStudentResponse = await fetch(import.meta.env.VITE_API_URL + `/courses/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("user_token")}`,
                },
                body: JSON.stringify({ courseId: courseId, studentAucId: aucId }),
            });

            const addStudentJson = await addStudentResponse.json();

            if (!addStudentResponse.ok || addStudentResponse.status !== 200) {
                setError(addStudentJson.message);
                return;
            }

            if (addStudentResponse.ok) {
                setSuccessMessage(`Student with AUC ID ${aucId} has been added to the course.`);
                setAucId(""); // Reset the input field
            } else {
                setError("Failed to add student to the course. Please try again.");
            }
        } catch (err) {
            console.log("Error: ", err);
            setError("An error occurred while adding the student. Please try again.");
        }
    };

    return (
        <div className="add-student-container">
            <h1>Add Student to Course</h1>
            <form onSubmit={handleFormSubmit} className="add-student-form">
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
                    Add Student
                </button>
                <button type="button" className="back-button" onClick={() => navigate(`/manage-students/${courseId}`)}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
