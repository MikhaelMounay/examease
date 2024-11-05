import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="course-view-container">
      <h1>Course Name: Introduction to programming </h1> {/* Update the course title */}
      <h2>Select an action for this course</h2>
      <div className="actions-grid1">
        <button 
          className="action-button1" 
          onClick={() => navigate('/make-exam')}
        >
          Make an Exam
        </button>
        <button 
          className="action-button1" 
          onClick={() => navigate('/manage-students')}
        >
          Manage Enrolled Students
        </button>
        <button 
          className="action-button1" 
          onClick={() => navigate('/monitor-exams')}
        >
          Monitor Live Exams
        </button>
        <button 
          className="action-button1" 
          onClick={() => navigate('/view-exams')}
        >
          View All Exams
        </button>
      </div>
    </div>
  );
};

export default CourseView;
