import React from 'react';

const CreateCourse: React.FC = () => {
  return (
    <div className="create-course-container">
      <h1 className="title">Create a Course</h1>
      <p className="subtitle">Include the properties of this course</p>
      <div className="form-grid">
        <div className="form-item">
          <label className="label">Course Name</label>
          <input type="text" placeholder="Software Engineering" className="input-box" />
        </div>
        
        <div className="form-item">
          <label className="label">Course Section</label>
          <input type="text" placeholder="02" className="input-box" />
        </div>

        <div className="form-item">
          <label className="label">Course Capacity</label>
          <input type="text" placeholder="30 Students" className="input-box" />
        </div>

        <div className="form-item">
          <label className="label">Course Professor and Assistants</label>
          <input type="text" placeholder="Dr. Hany Gouda, and (TA Merna)" className="input-box" />
        </div>
      </div>
      <div className="button-group">
        <button className="button edit-button">Edit Properties</button>
        <button className="button publish-button">Publish Course</button>
      </div>
    </div>
  );
};

export default CreateCourse;
