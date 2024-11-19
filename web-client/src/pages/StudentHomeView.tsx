import React from "react";
import { Link } from "react-router-dom";

const StudentHomeView: React.FC = function() {
    return (
        <div className="main-container">
            <h1 className="greeting">Hi, Student Ahmed Hany!</h1>
            <div className="card-grid">
                <Link to="/join-course" className="card blue"> Join a Course </Link>
                <Link to="/courses" className="card black"> Open an existing course </Link>
            </div>
        </div>
    );
};

export default StudentHomeView;