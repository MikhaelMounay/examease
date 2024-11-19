import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddStudent: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams(); // Get the course ID from the URL params
  const [aucId, setAucId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAucId(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
  
    // Validate the AUC ID format
    if (!aucId.match(/^\d+$/)) {
      setError('AUC ID must contain only numeric values.');
      return;
    }
  
    if (aucId.length !== 9) {
      setError('AUC ID must be exactly 9 digits long.');
      return;
    }
  
    try {
      console.log('Validating AUC ID:', aucId); // Debug
  
      // Call the new endpoint to check if the user exists
      const response = await fetch(`/api/users/${aucId}`);
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || 'User not found.');
        return;
      }
  
      console.log('User data fetched:', data.user);
  
      // Add the student to the course
      const addStudentResponse = await fetch(`/api/courses/${courseId}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aucId }),
      });
  
      if (addStudentResponse.ok) {
        setSuccessMessage(`Student with AUC ID ${aucId} has been added to the course.`);
        setAucId(''); // Clear the input
      } else {
        const errorData = await addStudentResponse.json();
        setError(errorData.message || 'Failed to add student to the course.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An error occurred while adding the student. Please try again.');
    }
  };
  

  return (
    <div className="add-student-container">
      <h1>Add Student to Course</h1>
      <form onSubmit={handleFormSubmit} className="add-student-form">
        <label htmlFor="aucId">AUC ID:</label>
        <input
          type="text"
          id="aucId"
          value={aucId}
          onChange={handleInputChange}
          placeholder="Enter AUC ID"
          required
        />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="submit-button">Add Student</button>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(`/manage-students`)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
