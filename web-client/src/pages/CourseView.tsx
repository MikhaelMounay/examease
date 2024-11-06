import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPage from './RegisterView';

const CourseView: React.FC = () => {
  const navigate = useNavigate();
  const Role = 'student'; // Update the role of the user
  const student_functions = () => (
    <div className="actions-grid1">
        <button 
          className="action-button1" 
          onClick={() => navigate('/take-exam')}
        >
          Take an exam
        </button>
        <button 
          className="action-button1" 
          onClick={() => navigate('/view-grades')}
        >
          View Grades & Feedback
        </button>
      </div>
  );
  const teacher_functions = () => (
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
  );
  return (
    <div className="course-view-container">
      <h1>Course Name: Introduction to programming </h1> {/* Update the course title */}
      <h2>Select an action for this course</h2>
      <div>
      {Role === 'teacher' ? teacher_functions() : student_functions()}
    </div>
      
    </div> 
  );
};

export default CourseView;
