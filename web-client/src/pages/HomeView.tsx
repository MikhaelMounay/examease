import React from "react";
import { Link } from "react-router-dom";
import { AuthData } from "../contexts/AuthWrapper";

const HomeView: React.FC = function () {
    const { userData } = AuthData();

    return (
        <div className="main-container">
            <h1 className="greeting">Hi, {userData?.name}!</h1>
            <div className="card-grid">
                <Link to="/courses" className="card blue">
                    Enter a Course{" "}
                </Link>
                {userData?.role === "INSTRUCTOR" && (
                    <Link to="/create-course" className="card black">
                        Create a New Course{" "}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomeView;
