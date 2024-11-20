import React from "react";
import { useNavigate } from "react-router-dom";

const MonitorLiveExams: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    const students = [
        { id: 1, name: "John Doe", progress: "75%" },
        { id: 2, name: "Jane Smith", progress: "60%" },
    ];

    return (
        <div className="monitor-live-exams-container">
            <h1>Monitor Live Exams</h1>
            <div className="student-list">
                {students.map((student) => (
                    <div key={student.id} className="student-card">
                        <div className="student-info">
                            <h2>{student.name}</h2>
                            <p>Progress: {student.progress}</p>
                        </div>
                        <button className="deny-access-button">Deny Access</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonitorLiveExams;
