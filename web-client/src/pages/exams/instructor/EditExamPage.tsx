import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthWrapper.tsx";
import { Exam } from "../../../types/Exam.ts";

const EditExamPage: React.FC = () => {
    const { examid } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [examData, setExamData] = useState<Exam | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        questions: "",
    });

    // Utility function to convert ISO time to HH:mm format
    const convertToTimeString = (isoString: string) => {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    // Utility function to convert ISO date to YYYY-MM-DD format
    const convertToDateString = (isoString: string | null | undefined): string => {
        if (!isoString) {
            console.error("Invalid date value:", isoString);
            return ""; // Return an empty string for invalid dates
        }
    
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            console.error("Failed to parse date:", isoString);
            return ""; // Return an empty string for unparsable dates
        }
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
    
        return `${year}-${month}-${day}`;
    };
    

    // Fetch exam data on page load
    useEffect(() => {
        const fetchExamData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/exams/${examid}`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch exam data");

                const data = await response.json();
                console.log("Fetched exam data:", data);

                setExamData(data);
                setFormValues({
                    title: data.title || "",
                    date: convertToDateString(data.date) || "", // Safeguard for invalid dates
                    startTime: convertToTimeString(data.startTime || ""),
                    endTime: convertToTimeString(data.endTime || ""),
                    questions: '',
                });
            } catch (err) {
                console.error("Error fetching exam data:", err);
                setError("Failed to load exam details.");
            } finally {
                setLoading(false);
            }
        };

        if (examid) {
            fetchExamData();
        } else {
            setError("Invalid exam ID");
            setLoading(false);
        }
    }, [examid, token]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission to update exam
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        console.log("Form values before submit:", formValues);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/exams/${examid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    ...formValues,
                    startTime: `${formValues.date}T${formValues.startTime}:00.000Z`, // Combine date and time
                    endTime: `${formValues.date}T${formValues.endTime}:00.000Z`,
                    questions: formValues.questions.split("\n"), // Convert questions back to array
                }),
            });

            if (!response.ok) throw new Error("Failed to update exam");

            setSuccess("Exam updated successfully.");
            navigate(`/exam-info/${examid}`);
        } catch (err) {
            console.error("Error updating exam:", err);
            setError("Failed to update exam.");
        }
    };

    if (loading) return <p>Loading exam details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-exam-container">
            <h1>Edit Exam: {examData?.title}</h1>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleFormSubmit} className="edit-exam-form">
                <label>
                    Exam Name:
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Exam Date:
                    <input
                        type="date"
                        name="date"
                        value={formValues.date}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="time"
                        name="startTime"
                        value={formValues.startTime}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        name="endTime"
                        value={formValues.endTime}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Questions (one per line):
                    <textarea
                        name="questions"
                        value={formValues.questions}
                        onChange={handleInputChange}
                        rows={5}
                        required
                    />
                </label>
                <button type="submit" className="update-button">
                    Update Exam
                </button>
                <button type="button" className="cancel-button" onClick={() => navigate(`/view-exams`)}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditExamPage;
