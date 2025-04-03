import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [currentMonth] = useState("January 2025");

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = 35; // Simplified for January 2025

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="calendar-day">
          {i <= 31 ? i : ""}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="teacher-dashboard">
      {/* Calendar Section */}
      <div className="dashboard-section calendar-section">
        <h2>{currentMonth}</h2>
        <div className="calendar-header">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>

      {/* Daily Schedule Section */}
      <div className="dashboard-section schedule-section">
        <div className="section-header">
          <h2>Your daily schedule</h2>
          <span className="time-icon">
            <i className="fas fa-clock"></i>
          </span>
        </div>
        <div className="schedule-table">
          <div className="schedule-header">
            <div>Class</div>
            <div>Timetable</div>
            <div>Status</div>
            <div>Completed</div>
          </div>
          <div className="schedule-row">
            <div>Student attendance</div>
            <div>Today's Classes</div>
            <div>
              <span className="status-badge progress">Progress</span>
            </div>
            <div>
              <span className="status-icon incomplete">×</span>
            </div>
          </div>
          <div className="schedule-row">
            <div>Lesson plans</div>
            <div>Upcoming</div>
            <div>
              <span className="status-badge progress">Progress</span>
            </div>
            <div>
              <span className="status-icon incomplete">×</span>
            </div>
          </div>
          <div className="schedule-row">
            <div>Effective Techniques</div>
            <div>Tomorrow's</div>
            <div>
              <span className="status-badge progress">Progress</span>
            </div>
            <div>
              <span className="status-icon incomplete">×</span>
            </div>
          </div>
          <div className="schedule-row">
            <div>Parent-Teacher</div>
            <div>13/01/2025</div>
            <div>
              <span className="status-badge progress">Progress</span>
            </div>
            <div>
              <span className="status-icon incomplete">×</span>
            </div>
          </div>
          <div className="schedule-row">
            <div>Online Exam</div>
            <div>25/01/2025</div>
            <div>
              <span className="status-badge progress">Progress</span>
            </div>
            <div>
              <span className="status-icon complete">✓</span>
            </div>
          </div>
          <div className="schedule-row">
            <div>Engage students</div>
            <div>27/01/2025</div>
            <div>
              <span className="status-badge progress">Progress</span>
            </div>
            <div>
              <span className="status-icon complete">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Notifications Section */}
      <div className="dashboard-section notifications-section">
        <div className="section-header">
          <h2>Event Notifications</h2>
          <span className="notification-icon">
            <i className="fas fa-bell"></i>
          </span>
        </div>
        <div className="notification-list">
          <div className="notification-item">
            <span className="notification-icon new">
              <i className="fas fa-plus"></i>
            </span>
            <span>New student attendance</span>
            <button className="expand-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div className="notification-item">
            <span className="notification-icon update">
              <i className="fas fa-sync"></i>
            </span>
            <span>Student attendance updated</span>
            <button className="expand-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div className="notification-item">
            <span className="notification-icon workshop">
              <i className="fas fa-chalkboard-teacher"></i>
            </span>
            <span>New workshops for students</span>
            <button className="expand-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div className="notification-item">
            <span className="notification-icon assignment">
              <i className="fas fa-file-alt"></i>
            </span>
            <span>New assignment from admin</span>
            <button className="expand-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Class Statistics Section */}
      <div className="dashboard-section stats-section">
        <h2>Class Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">View class schedule</span>
            <span className="stat-value">5</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed assignments</span>
            <span className="stat-value">12</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Certification progress</span>
            <span className="stat-value">9</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time spent per class</span>
            <span className="stat-value">130:54</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Upcoming class</span>
            <span className="stat-value">2</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Organized classes</span>
            <span className="stat-value">1</span>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="dashboard-section overview-section">
        <div className="section-header">
          <h2>Overview</h2>
          <span className="overview-icon">
            <i className="fas fa-clipboard-list"></i>
          </span>
        </div>
        <div className="overview-table">
          <div className="overview-header">
            <div>Tasks</div>
            <div>Due dates</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          <div className="overview-row">
            <div>Test Planning</div>
            <div>8:00pm</div>
            <div>
              <span className="status-badge in-progress">In progress</span>
            </div>
            <div>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
          <div className="overview-row">
            <div>Lesson Plans</div>
            <div>11:55pm</div>
            <div>
              <span className="status-badge in-progress">In progress</span>
            </div>
            <div>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
          <div className="overview-row">
            <div>Effective Techniques</div>
            <div>1:00am</div>
            <div>
              <span className="status-badge in-progress">In progress</span>
            </div>
            <div>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
          <div className="overview-row">
            <div>Parent-Teacher</div>
            <div>13/01/2025</div>
            <div>
              <span className="status-badge in-progress">In progress</span>
            </div>
            <div>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
          <div className="overview-row">
            <div>Digital Learning</div>
            <div>25/01/2025</div>
            <div>
              <span className="status-badge not-started">Not started</span>
            </div>
            <div>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Progress Section */}
      <div className="dashboard-section progress-section">
        <h2>Student Progress</h2>
        <div className="progress-metrics">
          <div className="metric-circle certifications">
            <div className="metric-value">12</div>
            <div className="metric-label">Certifications</div>
          </div>
          <div className="metric-circle success-rate">
            <div className="metric-value">99%</div>
            <div className="metric-label">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="dashboard-section achievements-section">
        <h2>Achievements Unlocked</h2>
        <div className="achievements-grid">
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-lightbulb"></i>
            </span>
            <span className="achievement-label">Great Work!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-bolt"></i>
            </span>
            <span className="achievement-label">Quick Learner!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-compass"></i>
            </span>
            <span className="achievement-label">Curiosity Unleashed!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-fire"></i>
            </span>
            <span className="achievement-label">Consistent Progress!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-moon"></i>
            </span>
            <span className="achievement-label">Night Owl!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">
              <i className="fas fa-chart-line"></i>
            </span>
            <span className="achievement-label">Growth Mindset!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
