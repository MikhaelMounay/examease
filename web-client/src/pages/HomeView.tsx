import React from "react";
import { Link } from "react-router-dom";
const HomeView: React.FC = function () {
    return (
      <div className="main-container">
      <h1 className="greeting">Hi, Professor Hany Gouda!</h1>
      <div className="card-grid">
          <Link to = "/courses" className="card blue">Enter a Course </Link>
          <Link to ="/create-course" className="card black">Create a New Course </Link>
      </div>
  </div>
    );
  }
  
  export default HomeView