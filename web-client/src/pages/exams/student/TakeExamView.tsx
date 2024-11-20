import React, { useState } from "react";

const TakeExamPage: React.FC = () => {
    const [enrollmentKey, setEnrollmentKey] = useState("");

    const handleSubmit = () => {
        // Logic to verify enrollment key (e.g., send it to the backend for validation)
        console.log(`Enrollment Key Submitted: ${enrollmentKey}`);
    };

    return (
        <div className="page-container">
            <h1>Take an Exam</h1>
            <div className="form-container">
                <label htmlFor="enrollmentKey" className="form-label">
                    Enrollment Key
                </label>
                <input
                    type="text"
                    id="enrollmentKey"
                    className="input-field"
                    value={enrollmentKey}
                    onChange={(e) => setEnrollmentKey(e.target.value)}
                    placeholder="Enter enrollment key"
                />
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TakeExamPage;
