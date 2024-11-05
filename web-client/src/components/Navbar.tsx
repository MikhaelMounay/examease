import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = function () {
    return (
        <nav className="top-nav">
        <div className="nav-logo">Educational App</div>
        <ul className="nav-links">
            <li><a href="#account">Account</a></li>
            <li><Link to ="/home">Home</Link></li>
            <li><a href="#inbox">Inbox</a></li>
            <li><a href="#calendar">Calendar</a></li>
            <li><a href="#contacts">Contacts</a></li>
        </ul>
    </nav>
    );
};

export default Navbar;
