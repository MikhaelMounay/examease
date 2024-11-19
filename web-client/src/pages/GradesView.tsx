import React from "react";

const ViewGradesPage: React.FC = () => {
    // Placeholder data for exams and grades
    const exams = [
        { id: 1, name: "Math Exam", grade: "85%" },
        { id: 2, name: "Science Exam", grade: "92%" },
    ];

    const handleExamClick = (examId: number) => {
        // Logic to view feedback for a specific exam (e.g., navigate to a detailed feedback page)
        console.log(`Viewing feedback for Exam : ${examId}`);
    };

    return (
        <div className="page-container">
            <h1>Grades and Feedback</h1>
            <div className="exams-container">
                {exams.map((exam) => (
                    <button
                        key={exam.id}
                        className="exam-button"
                        onClick={() => handleExamClick(exam.id)}
                    >
                        <span className="exam-name">{exam.name}</span>
                        <span className="exam-grade">Grade: {exam.grade}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ViewGradesPage;
