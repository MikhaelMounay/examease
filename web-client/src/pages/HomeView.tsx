import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthWrapper";

const HomeView: React.FC = function () {
    const { userData } = useAuth();

    // Determine greeting based on role
    const greeting =
        userData?.role === "INSTRUCTOR" ? `Hi, Professor ${userData?.name || "User"}` : `Hi, ${userData?.name || "User"}`;

    return (
        <div className="main-container">
            <h1 className="greeting">{greeting}</h1>

            <div className="card-grid">
                <Link to="/courses" className="card blue">
                    View Courses
                </Link>
                {userData?.role === "INSTRUCTOR" && (
                    <Link to="/create-course" className="card black">
                        Create a New Course
                    </Link>
                )}
                {userData?.role === "STUDENT" && (
                    <Link to="/join-course" className="card black">
                        Join a course{" "}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomeView;
