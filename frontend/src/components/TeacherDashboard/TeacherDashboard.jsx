import React from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher's Dashboard</h1>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">120</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div className="stat-content">
            <h3>Classes Today</h3>
            <p className="stat-number">5</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-content">
            <h3>Attendance Rate</h3>
            <p className="stat-number">92%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-content">
            <h3>Assignments</h3>
            <p className="stat-number">8</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Today's Schedule</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="schedule-time">8:00 AM - 9:30 AM</div>
              <div className="schedule-details">
                <div className="schedule-class">Mathematics</div>
                <div className="schedule-grade">Grade 10 Section A</div>
              </div>
              <div className="schedule-status ongoing">Ongoing</div>
            </div>

            <div className="schedule-item">
              <div className="schedule-time">9:45 AM - 11:15 AM</div>
              <div className="schedule-details">
                <div className="schedule-class">Physics</div>
                <div className="schedule-grade">Grade 11 Section B</div>
              </div>
              <div className="schedule-status">Upcoming</div>
            </div>

            <div className="schedule-item">
              <div className="schedule-time">11:30 AM - 1:00 PM</div>
              <div className="schedule-details">
                <div className="schedule-class">Chemistry</div>
                <div className="schedule-grade">Grade 11 Section A</div>
              </div>
              <div className="schedule-status">Upcoming</div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Announcements</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="announcements-list">
            <div className="announcement-item">
              <div className="announcement-date">March 30, 2023</div>
              <div className="announcement-title">Parent-Teacher Meeting</div>
              <div className="announcement-content">
                Parent-Teacher meeting scheduled for next Friday. Please prepare
                student progress reports.
              </div>
            </div>

            <div className="announcement-item">
              <div className="announcement-date">March 28, 2023</div>
              <div className="announcement-title">Science Exhibition</div>
              <div className="announcement-content">
                Annual Science Exhibition will be held on April 15th. Students
                should submit project proposals by April 5th.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
