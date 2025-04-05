import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);

    const newSidebarWidth = !isCollapsed ? "80px" : "250px";
    const newCardMarginLeft = !isCollapsed ? "-100px" : "-250px";

    document.documentElement.style.setProperty(
      "--sidebar-width",
      newSidebarWidth
    );
    document.documentElement.style.setProperty(
      "--card-margin-left",
      newCardMarginLeft
    );
  };

  useEffect(() => {
    const initialSidebarWidth = isCollapsed ? "80px" : "250px";
    const initialCardMarginLeft = isCollapsed ? "-100px" : "-250px";

    document.documentElement.style.setProperty(
      "--sidebar-width",
      initialSidebarWidth
    );
    document.documentElement.style.setProperty(
      "--card-margin-left",
      initialCardMarginLeft
    );
  }, [isCollapsed]);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo-container">
        <div className="logo">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fas fa-chevron-${isCollapsed ? "right" : "left"}`}></i>
        </button>
      </div>

      <nav className="nav-menu">
        <Link
          to="/teacher-dashboard"
          className={`nav-item ${isActive("/teacher-dashboard") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <i className="fas fa-home"></i>
          </div>
          <span className="nav-text">Home</span>
        </Link>

        <Link
          to="/teacher-dashboard"
          className={`nav-item ${isActive("/teacher-dashboard") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <span className="nav-text">Teacher Dashboard</span>
        </Link>

        <Link
          to="/classes"
          className={`nav-item ${isActive("/classes") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <i className="fas fa-users"></i>
          </div>
          <span className="nav-text">Classes</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link
          to="/notifications"
          className={`nav-item ${isActive("/notifications") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <i className="fas fa-bell"></i>
          </div>
          <span className="nav-text">Notifications</span>
        </Link>

        <Link
          to="/settings"
          className={`nav-item ${isActive("/settings") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <i className="fas fa-cog"></i>
          </div>
          <span className="nav-text">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
