import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Course } from "../../../types/Course.ts";
import { useAuth } from "../../../contexts/AuthWrapper.tsx";

const EditCoursePage: React.FC = () => {
    const { courseid } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [courseData, setCourseData] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({
        title: "",
        numStudents: "",
        instructorId: "",
    });

    // Fetch course data from API when the page loads
    useEffect(() => {
        console.log("Course ID from URL:", courseid);
        const fetchCourseData = async () => {
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
                console.log("Fetched course data:", data); // Log the fetched course data
        
                setCourseData(data);
                setFormValues({
                    title: data.title,
                    numStudents: data.numStudents,
                    instructorId: data.instructorId,
                });
            } catch (err) {
                console.error("Error fetching course data:", err);
                setError("Failed to load course details.");
            } finally {
                setLoading(false);
            }
        };        

        if (courseid) {
            fetchCourseData();
        } else {
            setError("Invalid course ID");
            setLoading(false);
        }
    }, [courseid, token]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission to update course
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        console.log("Form values before submit:", formValues); // Log the form values
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(formValues),
            });
    
            if (!response.ok) throw new Error("Failed to update course");
    
            setSuccess("Course updated successfully.");
            navigate(`/course-info/${courseid}`);
        } catch (err) {
            console.error("Error updating course:", err);
            setError("Failed to update course.");
        }
    };
    

    if (loading) return <p>Loading course details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-course-container">
            <h1>Edit Course: {courseData?.title}</h1>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleFormSubmit} className="edit-course-form">
                <label>
                    Course Name:
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Course Capacity:
                    <input
                        type="number"
                        name="numStudents"
                        value={formValues.numStudents}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit" className="update-button">
                    Update Course
                </button>
                <button type="button" className="cancel-button" onClick={() => navigate(`/course-info/${courseid}`)}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditCoursePage;
