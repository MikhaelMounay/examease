import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthData } from "../contexts/AuthWrapper";

const Navbar: React.FC = function() {
    const navigate = useNavigate();
    const { logout } = AuthData();

    // Methods
    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="top-nav">
            <div className="nav-logo">Educational App</div>
            <ul className="nav-links flex items-center justify-center">
                <li>
                    <a href="#account">Account</a>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <a href="#inbox">Inbox</a>
                </li>
                <li>
                    <a href="#calendar">Calendar</a>
                </li>
                <li>
                    <a href="#contacts">Contacts</a>
                </li>
                <li>
                    <button onClick={handleLogout} className="rounded bg-blue-600 px-4 py-1 text-white">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
