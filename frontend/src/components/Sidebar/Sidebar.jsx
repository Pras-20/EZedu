import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <i className="fas fa-graduation-cap"></i>
        </div>
      </div>

      <nav className="nav-menu">
        <Link to="/" className="nav-item active">
          <div className="nav-icon">
            <i className="fas fa-home"></i>
          </div>
          <span>Home</span>
        </Link>

        <Link to="/teacher-dashboard" className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <span>Teacher Dashboard</span>
        </Link>

        <Link to="/classes" className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-users"></i>
          </div>
          <span>Classes</span>
        </Link>

        <Link to="/schedule" className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <span>Schedule/Calendar</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/notifications" className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-bell"></i>
          </div>
          <span>Notifications</span>
        </Link>

        <Link to="/settings" className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-cog"></i>
          </div>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
