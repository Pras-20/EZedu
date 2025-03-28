import React from "react";
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
        <div className="nav-item active">
          <div className="nav-icon">
            <i className="fas fa-home"></i>
          </div>
          <span>Home</span>
        </div>

        <div className="nav-item">
          <span>Teacher Dashboard</span>
        </div>

        <div className="nav-item">
          <span>Classes</span>
        </div>

        <div className="nav-item">
          <span>Schedule/Calendar</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-bell"></i>
          </div>
          <span>Notifications</span>
        </div>

        <div className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-cog"></i>
          </div>
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
