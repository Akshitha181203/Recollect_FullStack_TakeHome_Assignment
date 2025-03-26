import React from "react";
import "./Navbar.css";
import logo from "../Images/resollect_logo.jpeg"; // Importing the uploaded logo

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* User Profile & Logout Section */}
      <div className="user-actions">
        {/* User Profile */}
        <div className="user-profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="profile-pic"
          />
          <div className="user-info">
            <span className="user-name">Tushar</span>
            <span className="user-email">tushar@resollect.com</span>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
