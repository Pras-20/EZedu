import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      id: "01",
      name: "Student 1",
      gender: "Male",
      grade: "10",
      section: "A",
      rollNo: "001",
    },
    {
      id: "02",
      name: "Student 2",
      gender: "Female",
      grade: "9",
      section: "B",
      rollNo: "002",
    },
    // Add more students as needed
  ];

  const handleProfileClick = () => {
    // Example functionality: Open profile menu or redirect
    console.log("Profile icon clicked");
    // You can replace this with actual functionality, like opening a modal or redirecting
  };

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Good evening, teacher!</h1>
        <div className="profile-icon" onClick={handleProfileClick}>
          <i className="fas fa-user-circle"></i>
        </div>
      </header>

      <section className="schedule-section">
        <h2>Schedule</h2>
      </section>

      <section className="student-details">
        <h2>Student Details</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={handleSearchClick}>
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
              <i className="fas fa-chart-bar"></i>
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
      </section>

      {isSearchModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeSearchModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2>Search Students</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name, grade, or section..."
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="filters">
              <select defaultValue="">
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select defaultValue="">
                <option value="" disabled>
                  Select Grade
                </option>
                <option value="all">All Grades</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <ul className="student-list">
              {students.map((student) => (
                <li
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="student-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="student-info">
                    <strong>{student.name}</strong>
                    <span>
                      Grade {student.grade} | Section {student.section}
                    </span>
                    <span>Roll No. {student.rollNo}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeSearchModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2>{selectedStudent.name}'s Details</h2>
            <img
              src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=4285f4&color=fff&size=120`}
              alt="Profile"
              className="profile-pic"
            />
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
            <p>
              <strong>Grade:</strong> {selectedStudent.grade}
            </p>
            <p>
              <strong>Section:</strong> {selectedStudent.section}
            </p>
            <p>
              <strong>Roll No:</strong> {selectedStudent.rollNo}
            </p>
            <p>
              <strong>Attendance:</strong> 95%
            </p>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="main-content">
          <section className="assignments-card">
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <div className="card-text">
                <h3>Assignments</h3>
                <p>Track student assignment easily!</p>
              </div>
            </div>
            <button className="create-btn">Create</button>
          </section>

          <section className="tasks-section">
            <h2>Today's tasks</h2>
            <div className="reminders-card">
              <div className="card-content">
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
          </section>

          <section className="materials-section">
            <h2>Educational Materials</h2>
            <div className="materials-grid">
              <button className="material-btn">
                <i className="fas fa-book"></i>
                <span>Study</span>
              </button>
              <button className="material-btn">
                <i className="fas fa-folder"></i>
                <span>Resources</span>
              </button>
              <button className="material-btn">
                <i className="fas fa-pen"></i>
                <span>Tests</span>
              </button>
              <button className="material-btn">
                <i className="fas fa-check-circle"></i>
                <span>Quizzes</span>
              </button>
            </div>
          </section>
        </div>

        <aside className="dashboard-sidebar">
          <section className="daily-tasks-card">
            <h2>Daily tasks</h2>
            <p>manage your daily tasks efficiently!</p>
            <button className="add-btn">Add</button>
          </section>

          <section className="attendance-section">
            <h2>Manage Attendance</h2>
            <div className="attendance-list">
              {students.map((student) => (
                <div key={student.id} className="attendance-item">
                  <div className="student-info">
                    <span className="student-id">{student.id}</span>
                    <div className="student-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <span className="student-name">{student.name}</span>
                  </div>
                  <span className="attendance-percentage">
                    {student.attendance}
                  </span>
                </div>
              ))}
              <button className="view-all-btn">View All</button>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
