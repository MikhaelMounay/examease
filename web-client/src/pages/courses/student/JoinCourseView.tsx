import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const JoinCoursePage: React.FC = () => {
    const [enrollmentKey, setEnrollmentKey] = useState("");
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const joinCourseMutation = useMutation({
        mutationFn: async (data: { enrollmentKey: string }) => {
            const response = await fetch(import.meta.env.VITE_API_URL + `/courses/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("user_token")}`,
                },
                body: JSON.stringify({
                    enrollmentKey: data.enrollmentKey,
                }),
            });

            const responseJson = await response.json();
            if (!response.ok || response.status !== 200) {
                if (responseJson.message) {
                    throw new Error(responseJson.message);
                }

                throw new Error("Error joining course.. Please try again later!");
            }
        },
        onSuccess: () => {
            navigate("/courses");
        },
        onError: (err) => {
            console.log("Error: ", err);
            setErrorMsg(err.message);
        },
    });

    const handleSubmit = () => {
        setErrorMsg("");
        joinCourseMutation.mutate({ enrollmentKey });
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

                <p className="mt-6 text-sm text-red-600">{errorMsg}</p>
            </div>
        </div>
    );
};

export default JoinCoursePage;
