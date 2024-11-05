import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAllExams: React.FC = () => {
  const navigate = useNavigate();

  const exams = [
    { id: 1, title: "Midterm Exam", date: "October 15, 2024" } 
  ]; {/* Update the exam title and date */}

  const handleExamClick = (examId: number) => {
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="view-all-exams-container">
      <h1>All Exams</h1>
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
    </div>
  );
};

export default ViewAllExams;
