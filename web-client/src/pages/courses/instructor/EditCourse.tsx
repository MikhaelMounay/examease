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

    // Fetch exam data from API
    useEffect(() => {
        console.log("Exam ID from URL:", examid);
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
                    date: data.date || "",
                    startTime: data.startTime || "",
                    endTime: data.endTime || "",
                    questions: (data.questions || []).join("\n"), // Join array to string for editing
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

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
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
                    questions: formValues.questions.split("\n"), // Convert questions back to an array
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
                <button type="button" className="cancel-button" onClick={() => navigate(`/`)}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditExamPage;
