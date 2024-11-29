import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus } from "@fortawesome/free-solid-svg-icons"; // Importing icons
import { useNavigate } from "react-router-dom";

const ViewAllExams: React.FC = () => {
    const navigate = useNavigate();

    const exams: { id: number; title: string; date: string }[] = []; // Simulate an empty list for testing

    const handleExamClick = (examId: number) => {
        navigate(`/exam/${examId}`);
    };

    const handleCreateExam = () => {
        navigate("/make-exam");
    };

    return (
        <div className="view-all-exams-container">
            <h1>All Exams</h1>

            {exams.length === 0 ? (
                <p>No exams created.</p>
            ) : (
                <>
                    <p>Select an exam to view details</p>
                    <div className="exam-list">
                        {exams.map((exam) => (
                            <div
                                key={exam.id}
                                className="exam-card"
                                onClick={() => handleExamClick(exam.id)}
                            >
                                <h2>{exam.title}</h2>
                                <p>{exam.date}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <button className="create-exam-button" onClick={handleCreateExam}>
            <FontAwesomeIcon icon={faPlus} className="create-exam-icon" />
            Create Exam
            </button>
        </div>
    );
};

export default ViewAllExams;
