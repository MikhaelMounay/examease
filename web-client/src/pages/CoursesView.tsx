import React from 'react';
import { Link } from 'react-router-dom';

const CoursesView: React.FC = () => {
    return (
        <div className="course-view-container">
            <h1 className="greeting">Your Courses</h1>
            <div className="course-list">
                <div className="course-card">
                    <div className="course-details">
                    <Link to="/course" className="button">Introduction to Programming</Link> {/* Update the course title */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesView;
