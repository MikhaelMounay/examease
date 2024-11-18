import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageStudentsView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-students-container">
      <h1>Manage Enrolled Students</h1>
      <p>Control student enrollment and access their information.</p>

      <div className="actions-grid">
        <button className="action-card" onClick={() => navigate('/add-student')}>
          <span className="card-title">Add Student</span>
        </button>

        <button className="action-card" onClick={() => navigate('/remove-student')}>
          <span className="card-title">Remove Student</span>
        </button>

        <button className="action-card" onClick={() => navigate('/view-students-info')}>
          <span className="card-title">View Student Info</span>
        </button>
      </div>
    </div>
  );
};

export default ManageStudentsView;
