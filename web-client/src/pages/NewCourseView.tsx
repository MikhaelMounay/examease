import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../contexts/AuthWrapper";
import { useMutation } from "@tanstack/react-query";
import { Course } from "../types/course";

const CreateCourse: React.FC = () => {
    const { userData, token } = AuthData();
    const navigator = useNavigate();

    const [courseName, setCourseName] = useState<string>("");
    const [courseCapacity, setCourseCapacity] = useState<string>("");
    const [openForEnrollment] = useState<boolean>(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const createCourseMutation = useMutation({
        mutationFn: async (data: {
            title: string;
            openForEnrollment: boolean;
        }) => {
            const response = await fetch(import.meta.env.VITE_API_URL + "/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(data),
            });
            return response.json() as Promise<Course>;
        },
        onSuccess: () => {
            console.log("Course created successfully");
            setShowSuccessModal(true);
            showSuccessModal;
            // Optional: Navigate to another page after success
        },
        onError: (error) => {
            console.error("Failed to create course", error);
        },
    });

    const CloseModal = () => {
        setShowSuccessModal(false);
    };

    function handleCreateCourse() {
        if (!(courseName && courseCapacity && userData?.id)) {
            console.error("Please fill in all fields");
            return;
        }

        createCourseMutation.mutate({
            title: courseName,
            openForEnrollment: openForEnrollment,
        });
    };
    function navigate(){
        navigator("/courses");
    }

    return (
        <div className="create-course-container">
            <h1 className="title">Create a Course</h1>
            <p className="subtitle">Include the properties of this course</p>
            <div className="form-grid">
                <div className="form-item">
                    <label className="label">Course Name</label>
                    <input
                        type="text"
                        placeholder="Software Engineering"
                        className="input-box"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>

                <div className="form-item">
                    <label className="label">Course Section</label>
                    <input type="text" placeholder="02" className="input-box" />
                </div>

                <div className="form-item">
                    <label className="label">Course Capacity</label>
                    <input
                        type="number"
                        placeholder="30"
                        className="input-box"
                        value={courseCapacity}
                        onChange={(e) => setCourseCapacity(e.target.value)}
                    />
                </div>

                <div className="form-item">
                    <label className="label">Course Professor and Assistants</label>
                    <input type="text" placeholder="Professor" className="input-box" />
                </div>
            </div>
            <div className="button-group">
                <button className="button edit-button" onClick={handleCreateCourse}>
                    Edit Properties
                </button>
                <button className="button publish-button" onClick={handleCreateCourse}>
                    Publish Course
                </button>
            </div>

            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Course Created Successfully!</h2>
                        <p>Your course has been created and the course Enrollment key is </p>
                        <p>Course Enrollment key : {createCourseMutation.data?.enrollmentKey}</p>
                        <button onClick={CloseModal}>OK</button>
                        <button onClick={navigate}>Go to Courses</button>
                    </div>
                </div>
            )}

           
        </div>
    );
};

export default CreateCourse;
