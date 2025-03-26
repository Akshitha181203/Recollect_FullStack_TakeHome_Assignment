import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../Images/resollect_logo.jpeg";
import { FaHome, FaBriefcase, FaBell, FaFileAlt, FaGavel, FaUpload, FaTools, FaUsers, FaKey } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
            <FaHome className="icon" /> Dashboard
          </NavLink></li>
        <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? "active-link" : ""}>
            <FaBriefcase className="icon" /> Portfolio
          </NavLink></li>
        <li><NavLink to="/Notifications" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaBell className="icon" /> Notifications
        </NavLink></li>
        <li><NavLink to="/Notices" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaFileAlt className="icon" /> Notices
        </NavLink></li>
        <li><NavLink to="/Auction" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaGavel className="icon" /> Auction
        </NavLink></li>
        <li><NavLink to="/DataUpload" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaUpload className="icon" /> Data Upload
        </NavLink></li>
        <li><NavLink to="/ControlPanel" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaTools className="icon" /> Control Panel
        </NavLink></li>
        <li><NavLink to="/UserManagement" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaUsers className="icon" /> User Management
        </NavLink></li>
        <li><NavLink to="/Permissions" className={({ isActive }) => isActive ? "active-link" : ""}>
        <FaKey className="icon" /> Permissions
        </NavLink></li>
      </ul>
      <div className="powered-by">
        <span>Powered by</span>
        <img src={logo} alt="Resollect" />
      </div>
    </div>
    
  );
};

export default Sidebar;
