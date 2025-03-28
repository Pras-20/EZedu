import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const students = [
    { id: "01", name: "Student 1", attendance: "98%" },
    { id: "02", name: "Student 2", attendance: "78%" },
    { id: "03", name: "Student 3", attendance: "87%" },
    { id: "04", name: "Student 4", attendance: "66%" },
  ];

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Good evening, teacher!</h1>
        <div className="profile-icon">
          <i className="fas fa-user-circle"></i>
        </div>
      </header>

      <div className="schedule-section">
        <h2>Schedule</h2>
      </div>

      <div className="student-details">
        <h2>Student Details</h2>
        <div className="action-buttons">
          <button className="action-btn">
            <div className="circle-icon">
              <i className="fas fa-search"></i>
            </div>
            <span>Search Student</span>
          </button>
          <button className="action-btn">
            <div className="circle-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <span>Mark Attendance</span>
          </button>
          <button className="action-btn">
            <div className="circle-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <span>Answer Queries</span>
          </button>
          <button className="action-btn">
            <div className="circle-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <span>Generate Report</span>
          </button>
          <button className="action-btn">
            <div className="circle-icon">
              <i className="fas fa-chevron-right"></i>
            </div>
            <span>More Options</span>
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="assignments-card">
            <div className="card-left">
              <div className="card-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <div className="card-text">
                <h3>Assignments</h3>
                <p>Track student assignment easily!</p>
              </div>
            </div>
            <button className="create-btn">Create</button>
          </div>

          <div className="tasks-section">
            <h2>Today's tasks</h2>
            <div className="reminders-card">
              <div className="card-left">
                <div className="card-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="card-text">
                  <h3>Reminders</h3>
                  <p>Set reminders for tasks!</p>
                </div>
              </div>
              <button className="set-btn">Set</button>
            </div>
          </div>

          <div className="materials-section">
            <h2>Educational Materials</h2>
            <div className="materials-grid">
              <button className="material-btn">
                <div className="circle-icon">
                  <i className="fas fa-book"></i>
                </div>
                <span>Study</span>
              </button>
              <button className="material-btn">
                <div className="circle-icon">
                  <i className="fas fa-folder"></i>
                </div>
                <span>Resources</span>
              </button>
              <button className="material-btn">
                <div className="circle-icon">
                  <i className="fas fa-pen"></i>
                </div>
                <span>Tests</span>
              </button>
              <button className="material-btn">
                <div className="circle-icon">
                  <i className="fas fa-check"></i>
                </div>
                <span>Quizzes</span>
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="daily-tasks-card">
            <h2>Daily tasks</h2>
            <p>manage your daily tasks efficiently!</p>
            <button className="add-btn">Add</button>
          </div>

          <div className="attendance-section">
            <h2>Manage Attendance</h2>
            <div className="attendance-list">
              {students.map((student) => (
                <div key={student.id} className="attendance-item">
                  <div className="student-info">
                    <span className="student-id">{student.id}</span>
                    <div className="student-avatar"></div>
                    <span className="student-name">{student.name}</span>
                  </div>
                  <span className="attendance-percentage">
                    {student.attendance}
                  </span>
                </div>
              ))}
            </div>
            <button className="view-all-btn">View All</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
