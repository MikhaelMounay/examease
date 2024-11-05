import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="course-view-container">
      <h1>Course Name: Introduction to programming </h1> {/* Update the course title */}
      <h2>Select an action for this course</h2>
      <div className="actions-grid">
        <button 
          className="action-button" 
          onClick={() => navigate('/make-exam')}
        >
          Make an Exam
        </button>
        <button 
          className="action-button" 
          onClick={() => navigate('/manage-students')}
        >
          Manage Enrolled Students
        </button>
        <button 
          className="action-button" 
          onClick={() => navigate('/monitor-exams')}
        >
          Monitor Live Exams
        </button>
        <button 
          className="action-button" 
          onClick={() => navigate('/view-exams')}
        >
          View Previous Exams
        </button>
      </div>
    </div>
  );
};

export default CourseView;
