import React from 'react';

const CreateExam: React.FC = () => {
  return (
    <div className="create-exam-container">
      <div className="exam-banner">
        <button> Create New Exam </button>  
        <div className="exam-icon">
          <img src="/path-to-your-icon/user-group-icon.svg" alt="User Group Icon" hidden />
        </div>
      </div>
      <div className="exam-actions">
        <button className="action-button edit-exam">
          <span className="icon">💬</span> Edit Exam
        </button>
        <button className="action-button delete-exam">
          <span className="icon">📄</span> Delete Exam
        </button>
      </div>
    </div>
  );
};

export default CreateExam;
